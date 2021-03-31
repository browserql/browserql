import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo {
    title
    done
    id
  }
}
`
