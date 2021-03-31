import gql from 'graphql-tag'

export default gql`
  type Todo @firestore {
    title: String!
    done: Boolean!
  }
`
