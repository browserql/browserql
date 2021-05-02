import gql from 'graphql-tag'

export default gql`
query {
  firestoreGet_Todo(ref: [{ where: { done: { equals: true } } }]) {
    title
    done
    id
  }
}

`
