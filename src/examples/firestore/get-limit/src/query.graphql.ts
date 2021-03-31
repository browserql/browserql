import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo(limit: 2) {
    title
    done
    id
  }
}
`
