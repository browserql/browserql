import gql from 'graphql-tag'

export default gql`
type Query {
  firestoreGetTYPE(
    """
    Where
    Doc: https://firebase.google.com/docs/firestore/query-data/queries
    """
    where: [FirestoreWhereInput!]
    """
    Start At Cursor

    Doc: https://firebase.google.com/docs/firestore/query-data/query-cursors
    """
    startAt: ID
    """
    Start After Cursor

    Doc: https://firebase.google.com/docs/firestore/query-data/query-cursors
    """
    startAfter: ID
    """
    End At Cursor

    Doc: https://firebase.google.com/docs/firestore/query-data/query-cursors
    """
    endAt: ID
    """
    End After Cursor

    Doc: https://firebase.google.com/docs/firestore/query-data/query-cursors
    """
    endAfter: ID
    """
    Limit
    Doc: https://firebase.google.com/docs/firestore/query-data/order-limit-data
    """
    limit: Int
    """
    Order By
    Doc: https://firebase.google.com/docs/firestore/query-data/order-limit-data
    """
    orderBy: [FirestoreOrderBy!]
  ): [ TYPE ! ] !

  firestoreCountTYPE(
    where: [FirestoreWhereInput!]
    startAt: ID
    startAfter: ID
    endAt: ID
    endAfter: ID
    orderBy: [FirestoreOrderBy!]
  ): Int !
}

type Mutation {
  firestoreAddTYPE(
    TYPE: TYPEFirestoreInput
  ): TYPE!

  firestoreUpdateTYPE(
    where: FirestoreWhereInput
    startAt: ID
    startAfter: ID
    endAt: ID
    endAfter: ID
    orderBy: [FirestoreOrderBy!]
    TYPE: TYPEFirestoreInput
  ): TYPE

  firestoreDeleteTYPE(
    where: FirestoreWhereInput
    startAt: ID
    startAfter: ID
    endAt: ID
    endAfter: ID
    orderBy: [FirestoreOrderBy!]
  ): Boolean!
}
`
