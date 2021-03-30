import firestore from 'firebase'
import gql from 'graphql-tag'
import { print, DocumentNode, DirectiveNode } from 'graphql'
import { JSONResolver } from 'graphql-scalars'

import { transformTypeToInput } from '@browserql/inputs'
import type { BrowserqlClientPropertyFactory, BrowserqlClient } from '@browserql/types'

import { getArgument, getDirective, getFields, getName, getTypes, getValue } from '../fpql'
import { getDocuments, makeFirestoreQuery } from './utils'
import { FirestoreGetQueryVariables } from './types'

const scalars = gql`
scalar FirestoreJSON
`

const inputs = gql`
input FirestoreWhereInput {
  field: String!
  equals: FirestoreJSON
}

input FirestoreOrderBy {
  field: String!
  desc: Boolean = false
}
`

const directives = gql`
directive @firestore(collection: String) on OBJECT
`

const Query = `
type Query {
  firestoreGetTYPE(
    where: FirestoreWhereInput
    startAt: Int = 0
    endAt: Int = 64
    sortBy: [FirestoreOrderBy!] = []
  ): [ TYPE ! ] !

  firestoreCountTYPE(
    where: FirestoreWhereInput
    startAt: Int = 0
    endAt: Int = 64
    sortBy: [FirestoreOrderBy!]
  ): Int !
}
`

const Mutation = `
type Mutation {
  firestoreAddTYPE(
    TYPE: TYPEFirestoreInput
  ): TYPE!

  firestoreUpdateTYPE(
    where: FirestoreWhereInput
    startAt: Int = 0
    endAt: Int = 64
    sortBy: [FirestoreOrderBy!]
    TYPE: TYPEFirestoreInput
  ): TYPE

  firestoreDeleteTYPE(
    where: FirestoreWhereInput
    startAt: Int = 0
    endAt: Int = 64
    sortBy: [FirestoreOrderBy!]
  ): TYPE
}
`

export default function connect(
  db: firestore.firestore.Firestore,
): BrowserqlClientPropertyFactory {
  return ({ cache, schema }) => {
    const types = getTypes(schema as DocumentNode)
    const models = types.filter(getDirective('firestore'))
    const defs: string[] = []
    const queries: Record<string, any> = {}
    models.forEach(model => {
      const modelName = getName(model)
      const collectionDirective = getDirective('firestore')(model)
      const collectionArgument = getArgument('collection')(collectionDirective as DirectiveNode)
      const collection = collectionArgument ? getValue(collectionArgument) : modelName
      defs.push(
        Query.replace(/TYPE/g, modelName),
        Mutation.replace(/TYPE/g, modelName),
        print(transformTypeToInput(model, schema as DocumentNode))
          .replace(`input ${modelName}Input `, `input ${modelName}FirestoreInput `),
      )
      const fields = getFields(model)
      if (!fields.find(field => getName(field) === 'id')) {
        defs.push(`extend type ${modelName} { id: ID! }`)
      }
      Object.assign(queries, {
        async [`firestoreGet${modelName}`]({ startAt, endAt, limit }: FirestoreGetQueryVariables) {
          return new Promise((resolve) => {
            const query = makeFirestoreQuery(collection, { startAt, endAt, limit })(db)
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
          const query = makeFirestoreQuery(collection)(db)
          const snapshot = await query.get()
          return snapshot.size
        }
      })
    })
    const finalSchema = gql([
      print(inputs),
      print(scalars),
      print(directives),
      ...defs,
    ].join('\n'))
    console.log(print(finalSchema))
    return {
      schema: finalSchema,
      scalars: { FirestoreJSON: JSONResolver },
      queries,
    }
  }
}
