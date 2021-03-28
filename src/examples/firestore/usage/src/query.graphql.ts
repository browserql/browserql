import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo(
    where: { field: "done" equals: true }
    range: 10
    sortBy: "title"
  ) {
    title
    done
    id
  }
}

`
