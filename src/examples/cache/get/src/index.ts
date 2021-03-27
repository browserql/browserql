import connectCache from '@browserql/cache'
import gql from 'graphql-tag'
import client from './client'

export default async function() {
  // Create the cache wrapper
  const cached = connectCache(client.cache, client.schema)
  // Our query
  const query = gql`{ getCounter }`
  // Get cache value
  return cached.get(query)
}