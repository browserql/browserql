import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo(
    where: { field: "done" equals: true }
    limit: 2
    sortBy: "title"
  ) {
    title
    done
    id
  }
}

`
