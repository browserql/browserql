import gql from 'graphql-tag'

export default gql`
query {
  firestoreGet_Todo {
    title
    done
    id
  }
}
`
