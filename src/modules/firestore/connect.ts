import firestore from 'firebase'
import gql from 'graphql-tag'
import { print, DocumentNode } from 'graphql'

import { BrowserqlClientPropertyFactory } from '@browserql/types'
import { getDirective, getName, getTypes } from '../fpql'

const RangeScalar = gql`
scalar FirestoreRange
`

const WhereInput = gql`
input FirestoreWhereInput {
  field: String!
  equals: JSON
}
`

const GetQuery = `
type Query {
  firestoreGetTYPE(
    where: FirestoreWhereInput
    range: RangeScalar
    sortBy: String!
  ): [ TYPE ! ] !
}
`

const Mutation = `
type Mutation {
  firestoreAddTYPE(
    TYPE: TYPEInput
  ): TYPE!

  firestoreUpdateTYPE(
    where: FirestoreWhereInput
    range: RangeScalar
    sortBy: String!
    TYPE: TYPEInput
  ): TYPE

  firestoreDeleteTYPE(
    where: FirestoreWhereInput
    range: RangeScalar
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
      defs.push(GetQuery.replace(/TYPE/g, modelName))
      defs.push(Mutation.replace(/TYPE/g, modelName))
      Object.assign(queries, {
        async [`firestoreGet${modelName}`]() {
          
        }
      })
    })
    return {
      schema: gql([
        print(WhereInput),
        print(RangeScalar),
        ...defs,
      ].join('\n'))
    }
  }
}
