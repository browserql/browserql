import { gql } from '@apollo/client'

export default gql`
mutation deleteTodo($id: ID!) {
  firestoreDeleteTodo(
   id: $id
  )
}
`