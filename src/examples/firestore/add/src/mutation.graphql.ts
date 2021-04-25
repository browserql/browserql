import gql from 'graphql-tag'

export default gql`
mutation {
  firestoreAddTodo(input: {
    title: "Buy milk"
    done: false
  }) {
    title
    done
    id
  }
}


`
