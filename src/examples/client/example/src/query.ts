import client from './client'
import query from './operations.graphql'

export default async () => {
  return client.apollo.query({ query })
}
