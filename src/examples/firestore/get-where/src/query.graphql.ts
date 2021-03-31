import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo(where: [{ field: "done" equals: true }]) {
    title
    done
    id
  }
}

`
