import { gql } from '@apollo/client'

export default gql`
type Todo @firestore {
  title: String!
  done: Boolean
}
`