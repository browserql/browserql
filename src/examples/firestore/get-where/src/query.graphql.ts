import gql from 'graphql-tag'

export default gql`
query {
  firestoreGet_Todo(query: [{ where: { done: { equals: true } } }]) {
    title
    done
    id
  }
}

`
