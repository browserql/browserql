import gql from 'graphql-tag'

export default gql`
type Query {
  firestoreGet_TYPE(
    ref: [FirestoreRef_TYPE!]
  ): [ TYPE ! ] !

  firestoreCount_TYPE(
    ref: [FirestoreRef_TYPE!]
  ): Int !
}

type Mutation {
  firestoreAdd_TYPE(
    TYPE: TYPEFirestoreInput
  ): TYPE!

  firestoreUpdate_TYPE(
    ref: [FirestoreRef_TYPE!]
    TYPE: TYPEFirestoreInput
  ): TYPE

  firestoreDelete_TYPE(
    id: ID!
  ): ID!
}

`
