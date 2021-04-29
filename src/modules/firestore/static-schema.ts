import gql from 'graphql-tag'

export default gql`
"""
[The firestore directive ](https://browserql-docs.web.app/examples/firestore/schema#firestore-directive)
"""
directive @firestore(collection: String) on OBJECT

scalar FirestoreJSON

input FirestoreWhereInput {
  field: String!
  equals: FirestoreJSON
  equalsNot: FirestoreJSON
  in: [FirestoreJSON]
  notIn: [FirestoreJSON]
  lessThan: Float
  lessThanOrEqual: Float
  greaterThan: Float
  greaterThanOrEqual: Float
  arrayContains: FirestoreJSON
  arrayContainsAny: [FirestoreJSON]
}

input FirestoreOrderBy {
  field: String!
  desc: Boolean = false
}

`
