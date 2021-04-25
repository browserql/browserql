import firestore from 'firebase'
import { print, DocumentNode, DirectiveNode, parse } from 'graphql'
import { JSONResolver } from 'graphql-scalars'

import { transformTypeToInput } from '@browserql/inputs'
import type { BrowserqlClientPropertyFactory, BrowserqlClient, BrowserqlClientContext } from '@browserql/types'

import { getArgument, getDirective, getFields, getName, getTypes, getValue } from '../fpql'
import { getDocument, getDocuments, makeFirestoreRef } from './utils'
import { FirestoreGetQueryVariables } from './types'
import staticSchema from './static-schema'
import dynamicSchema from './dynamic-schema'

export default function connect(
  db: firestore.firestore.Firestore,
): BrowserqlClientPropertyFactory {
  return ({ cache, schema }) => {
    const types = getTypes(schema as DocumentNode)
    const models = types.filter(getDirective('firestore'))
    const defs: string[] = [
      print(staticSchema)
    ]
    const queries: Record<string, any> = {}
    models.forEach(model => {
      const modelName = getName(model)
      const collectionDirective = getDirective('firestore')(model)
      const collectionArgument = getArgument('collection')(collectionDirective as DirectiveNode)
      const collection = collectionArgument ? getValue(collectionArgument) : modelName
      
      defs.push(
        print(dynamicSchema).replace(/TYPE/g, modelName),
        print(transformTypeToInput(model, schema as DocumentNode))
          .replace(`input ${modelName}Input `, `input ${modelName}FirestoreInput `),
      )
      
      const fields = getFields(model)
      if (!fields.find(field => getName(field) === 'id')) {
        defs.push(`extend type ${modelName} { id: ID! }`)
      }
      
      Object.assign(queries, {
        async [`firestoreGet${modelName}`](variables: FirestoreGetQueryVariables, ctx: BrowserqlClientContext, o: any) {
          return new Promise((resolve) => {
            const query = makeFirestoreRef(collection, variables)(db)
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

                console.log(q)

                ctx.browserqlClient.cache.writeQuery({
                  ...q,
                  data: {
                    [`firestoreGet${modelName}`]: documents.map((doc) => ({
                      ...doc,
                      __typename: name,
                    })),
                  },
                })
                ctx.browserqlClient.apollo.query(q)
              }
            })
          })
        },
        
        async[`firestoreCount${modelName}`]() {
          const query = makeFirestoreRef(collection)(db)
          const snapshot = await query.get()
          return snapshot.size
        },
        
        async[`firestoreAdd${modelName}`](input: any) {
          const candidate = input[modelName]
          const docRef = await db.collection(collection).add(candidate)
          return await getDocument(docRef)
        },

        async[`firestoreDelete${modelName}`](variables: FirestoreGetQueryVariables) {
          const query = makeFirestoreRef(collection, variables)(db)
          // @ts-ignore
          await query.delete()
          return true
        }
      })
    })
    const finalSchema = parse([...defs].join('\n'))
    return {
      schema: finalSchema,
      scalars: { FirestoreJSON: JSONResolver },
      queries,
    }
  }
}
