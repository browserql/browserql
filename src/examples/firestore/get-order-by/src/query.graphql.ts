import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo(orderBy: [{ field: "title" }]) {
    title
    done
    id
  }
}

`
