import gql from 'graphql-tag'

export default gql`
query {
  firestoreGet_Todo(ref: [{ limit: 2 }]) {
    title
    done
    id
  }
}

`
