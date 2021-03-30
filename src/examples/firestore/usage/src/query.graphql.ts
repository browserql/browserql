import gql from 'graphql-tag'

export default gql`
query {
  firestoreGetTodo(
    where: { field: "done" equals: true }
    limit: 2
  ) {
    title
    done
    id
  }
}

`
