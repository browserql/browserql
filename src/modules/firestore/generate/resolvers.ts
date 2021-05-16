import { print, DocumentNode, DirectiveNode, parse } from 'graphql'
import { JSONResolver } from 'graphql-scalars'
import firestore from 'firebase'

import type { BrowserqlClientContext } from '@browserql/types'
import { getArgument, getDirective, getName, getTypes, getValue } from '@browserql/fpql'

import { getDocument, getDocuments, makeFirestoreRef } from '../utils'
import { FirestoreGetQueryVariables } from '../types'


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
        async [`firestoreGet_${modelName}`](
          variables: {
            query?: FirestoreGetQueryVariables[]
            doc?: string
          },
          ctx: BrowserqlClientContext,
          o: any
        ) {
          return new Promise((resolve) => {
            const query = variables.doc
              ? db.collection(collection).doc(variables.doc)
              : makeFirestoreRef(collection, variables.query)(db)
            let resolved = false
            // @ts-ignore
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
                      [`firestoreGet_${modelName}`]: documents.map((doc) => ({
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

        async[`firestoreDelete_${modelName}`]({ doc, query }: any) {
          if (doc) {
            await db.collection(collection).doc(doc).delete()
            return [doc]
          }
          const ref = makeFirestoreRef(collection, query)(db)
          const documents = await ref.get()
          const removals: string[] = []
          documents.forEach(snapshot => {
            removals.push(snapshot.id)
          })
          await Promise.all(
            removals.map(removal => db.collection(collection).doc(removal).delete())
          )
          return removals
        }
      })
    })
    return {
      scalars: { FirestoreJSON: JSONResolver },
      queries,
    }
}