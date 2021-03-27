import gql from 'graphql-tag'

export default gql`
query {
  getTodo(id: 2) {
    completed
    id
    title
    userId
  }
}


`