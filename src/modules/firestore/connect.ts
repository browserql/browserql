import firestore from 'firebase'
import gql from 'graphql-tag'
import { print, DocumentNode } from 'graphql'
import { JSONResolver } from 'graphql-scalars'

import { transformTypeToInput } from '@browserql/inputs'
import { BrowserqlClientPropertyFactory } from '@browserql/types'

import { getDirective, getName, getTypes } from '../fpql'

const scalars = gql`
scalar FirestoreJSON
scalar FirestoreRange
`

const WhereInput = gql`
input FirestoreWhereInput {
  field: String!
  equals: FirestoreJSON
}
`

const directives = gql`
directive @firestore(collecvtion: String) on OBJECT
`

const Query = `
type Query {
  firestoreGetTYPE(
    where: FirestoreWhereInput
    range: FirestoreRange
    sortBy: String!
  ): [ TYPE ! ] !
}
`

const Mutation = `
type Mutation {
  firestoreAddTYPE(
    TYPE: TYPEFirestoreInput
  ): TYPE!

  firestoreUpdateTYPE(
    where: FirestoreWhereInput
    range: FirestoreRange
    sortBy: String!
    TYPE: TYPEFirestoreInput
  ): TYPE

  firestoreDeleteTYPE(
    where: FirestoreWhereInput
    range: FirestoreRange
    sortBy: String!
  ): TYPE
}
`

export default function connect(
  db: firestore.firestore.Firestore,
  schema: DocumentNode
): BrowserqlClientPropertyFactory {
  return () => {
    const types = getTypes(schema)
    const models = types.filter(getDirective('firestore'))
    const defs: string[] = []
    const queries: Record<string, any> = {}
    models.forEach(model => {
      const modelName = getName(model)
      defs.push(
        Query.replace(/TYPE/g, modelName),
        Mutation.replace(/TYPE/g, modelName),
        print(transformTypeToInput(model, schema))
          .replace(`input ${modelName}Input `, `input ${modelName}FirestoreInput `),
      )
      Object.assign(queries, {
        async [`firestoreGet${modelName}`]() {
          console.log('hello')
          return []
        }
      })
    })
    const finalSchema = gql([
      print(WhereInput),
      print(scalars),
      print(directives),
      ...defs,
    ].join('\n'))
    return {
      schema: finalSchema,
      scalars: { FirestoreJSON: JSONResolver },
      queries,
    }
  }
}
