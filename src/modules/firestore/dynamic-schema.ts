import gql from 'graphql-tag'

export default gql`
type Query {
  firestoreGet_TYPE(
    ref: [FirestoreRef!]
  ): [ TYPE ! ] !

  firestoreCount_TYPE(
    ref: [FirestoreRef!]
  ): Int !
}

type Mutation {
  firestoreAdd_TYPE(
    TYPE: TYPEFirestoreInput
  ): TYPE!

  firestoreUpdate_TYPE(
    ref: [FirestoreRef!]
    TYPE: TYPEFirestoreInput
  ): TYPE

  firestoreDelete_TYPE(
    id: ID!
  ): ID!
}

`
