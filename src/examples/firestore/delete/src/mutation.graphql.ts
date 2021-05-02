import { gql } from '@apollo/client'

export default gql`
mutation deleteTodo($id: ID!) {
  firestoreDelete_Todo(
   id: $id
  )
}
`