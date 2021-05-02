import gql from 'graphql-tag'

export default gql`
query {
  firestoreGet_Todo(
    ref: [
      { orderBy: [{ field: "title" }] }
    ]
  ) {
    title
    done
    id
  }
}

`
