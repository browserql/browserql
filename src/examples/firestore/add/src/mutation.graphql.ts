import gql from 'graphql-tag'

export default gql`
mutation {
  firestoreAdd_Todo(Todo: {
    title: "Buy milk"
    done: false
  }) {
    title
    done
    id
  }
}


`
