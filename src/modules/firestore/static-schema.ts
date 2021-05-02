import gql from 'graphql-tag'

export default gql`
directive @firestore(collection: String) on OBJECT

scalar FirestoreJSON

input FirestoreOrderBy {
  field: String!
  desc: Boolean = false
}

`
