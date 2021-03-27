import gql from 'graphql-tag'

export default gql`
type Query {
  getUsers: [User!]
}

type User {
  id: ID!
  login: String!
}

`