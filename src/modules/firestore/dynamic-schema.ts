import gql from 'graphql-tag'

export default gql`
type Query {
  firestoreGet_TYPE(
    query: [FirestoreRef_TYPE!]
    doc: ID
  ): [ TYPE ! ] !

  firestoreCount_TYPE(
    query: [FirestoreRef_TYPE!]
  ): Int !
}

type Mutation {
  firestoreAdd_TYPE(
    TYPE: TYPEFirestoreInput
  ): TYPE!

  firestoreUpdate_TYPE(
    query: [FirestoreRef_TYPE!]
    TYPE: TYPEFirestoreInput
  ): TYPE

  firestoreDelete_TYPE(
    query: [FirestoreRef_TYPE!]
    doc: ID
  ): [ID!]!
}

`
