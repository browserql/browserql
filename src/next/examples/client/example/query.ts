import client from './client'
import query from './operations.graphql'

export default async function runQuery() {
  return client.apollo.query({ query, variables: { to: 'friends' } })
}
