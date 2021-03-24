import connect from '@browserql/client'
import gql from 'graphql-tag'
import { join } from 'path'
import { readFile } from 'fs/promises'
import { whatTimeIsIt } from './resolvers'

export default async function() {
  // Let's grab our GraphQL schema file and parse it with GraphQL
  const schemaPath = join(__dirname, 'schema.graphql')
  const schemaSource = (await readFile(schemaPath)).toString()
  const schema = gql(schemaSource)

  // Now we construct our queries
  const queries = { whatTimeIsIt }

  // Now we put together our client
  const client = connect(schema, { queries })

  // Let's trigger a query now
  // const response = await client.apollo.query({

  // })

  return 1
}