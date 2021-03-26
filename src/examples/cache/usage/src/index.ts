import connectCache from '@browserql/cache'
import gql from 'graphql-tag'
import client from './client'

export default async function() {
  // Create the cache wrapper
  const cached = connectCache(client.cache, client.schema)
  // Our query
  const query = gql`{ getCounter }`
  // Initial value
  const initialValue = cached.get(query)
  // Set cache
  cached.set(query, { getCounter: 100 })
  // Cache new value
  const valueAfterChange = cached.get(query)
  return {
    initialValue,
    valueAfterChange
  }
}
