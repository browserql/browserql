import gql from 'graphql-tag'

export default gql`
mutation {
  firestoreAddTodo(Todo: {
    title: "Buy milk"
    done: false
  }) {
    title
    done
    id
  }
}


`
