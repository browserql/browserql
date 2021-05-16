import gql from 'graphql-tag'

export default gql`
query {
  firestoreGet_Todo(
    query: [
      { orderBy: [{ field: "title" }] }
    ]
  ) {
    title
    done
    id
  }
}

`
