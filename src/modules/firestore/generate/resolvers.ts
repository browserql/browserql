import { print, DocumentNode, DirectiveNode, parse } from 'graphql'
import { JSONResolver } from 'graphql-scalars'
import firestore from 'firebase'

import { transformTypeToInput } from '@browserql/inputs'
import type { BrowserqlClientContext } from '@browserql/types'
import { getArgument, getDirective, getFields, getName, getTypes, getValue } from '@browserql/fpql'

import { getDocument, getDocuments, makeFirestoreRef } from '../utils'
import { FirestoreGetQueryVariables } from '../types'
import staticSchema from '../static-schema'
import dynamicSchema from '../dynamic-schema'


export default function generateResolvers(schema: DocumentNode, db: firestore.firestore.Firestore) {
  const types = getTypes(schema as DocumentNode)
    const models = types.filter(getDirective('firestore'))
    const queries: Record<string, any> = {}
    models.forEach(model => {
      const modelName = getName(model)
      const collectionDirective = getDirective('firestore')(model)
      const collectionArgument = getArgument('collection')(collectionDirective as DirectiveNode)
      const collection = collectionArgument ? getValue(collectionArgument) : modelName
      
      Object.assign(queries, {
        async [`firestoreGet_${modelName}`](variables: { ref?: FirestoreGetQueryVariables[] }, ctx: BrowserqlClientContext, o: any) {
          return new Promise((resolve) => {
            const query = makeFirestoreRef(collection, variables.ref)(db)
            let resolved = false
            query.onSnapshot(async (snapshot) => {
              const documents = await getDocuments<any>(snapshot)
              if (!resolved) {
                resolved = true
                resolve(documents)
              } else {
                const q = {
                  query: parse(print(o.operation)),
                  variables: o.variableValues,
                }

                try {
                  ctx.browserqlClient.cache.writeQuery({
                    ...q,
                    data: {
                      [`firestoreGet${modelName}`]: documents.map((doc) => ({
                        ...doc,
                        __typename: modelName,
                      })),
                    },
                  })
                } catch (error) {
                  console.warn(`Failed to refresh cache`)
                }
                
                try {
                  await ctx.browserqlClient.apollo.query(q)
                } catch (error) {
                  console.warn('Fail to refire query')
                }
              }
            })
          })
        },
        
        async[`firestoreCount_${modelName}`]() {
          const query = makeFirestoreRef(collection)(db)
          const snapshot = await query.get()
          return snapshot.size
        },
        
        async[`firestoreAdd_${modelName}`](input: any) {
          const candidate = input[modelName]
          const docRef = await db.collection(collection).add(candidate)
          try {
            return await getDocument(docRef)
          } catch (error) {
            try {
              return await getDocument(docRef)
            } catch (error) {
              return await getDocument(docRef, {})
            }
          }
        },

        async[`firestoreDelete_${modelName}`]({ id }: any) {
          await db.collection(collection).doc(id).delete()
          return id
        }
      })
    })
    return {
      scalars: { FirestoreJSON: JSONResolver },
      queries,
    }
}