import connectCache from '@browserql/cache'
import client from './client'

export default async function() {
  const cached = connectCache(client.cache, client.schema)
  return 'Hello world!'
}
