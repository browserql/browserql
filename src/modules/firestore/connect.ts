import firestore from 'firebase'
import gql from 'graphql-tag'
import { print, DocumentNode, DirectiveNode } from 'graphql'
import { JSONResolver } from 'graphql-scalars'

import { transformTypeToInput } from '@browserql/inputs'
import type { BrowserqlClientPropertyFactory, BrowserqlClient } from '@browserql/types'

import { getArgument, getDirective, getFields, getName, getTypes, getValue } from '../fpql'
import { getDocuments, makeFirestoreRef } from './utils'
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
        async [`firestoreGet${modelName}`](variables: FirestoreGetQueryVariables) {
          return new Promise((resolve) => {
            const query = makeFirestoreRef(collection, variables)(db)
            let resolved = false
            query.onSnapshot(async (snapshot) => {
              const documents = await getDocuments<any>(snapshot)
              if (!resolved) {
                resolved = true
                resolve(documents)
              } else {
                // cache.writeQuery({
                //   ...resolved.Query[fullName](variables),
                //   data: {
                //     [fullName]: documents.map((doc) => ({
                //       ...doc,
                //       __typename: name,
                //     })),
                //   },
                // })
                // query(resolved.Query[fullName](variables))
              }
            })
          })
        },
        
        async[`firestoreCount${modelName}`]() {
          const query = makeFirestoreRef(collection)(db)
          const snapshot = await query.get()
          return snapshot.size
        },
        
        async[`firestoreAdd${modelName}`]() {
          // const docRef =
        }
      })
    })
    const finalSchema = gql([...defs].join('\n'))
    return {
      schema: finalSchema,
      scalars: { FirestoreJSON: JSONResolver },
      queries,
    }
  }
}
