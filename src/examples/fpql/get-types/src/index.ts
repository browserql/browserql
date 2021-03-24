import getTypes from '@browserql/fpql/get/types'
import gql from 'graphql-tag'
import { join } from 'path'
import { readFile } from 'fs/promises'

export default async () => {
  // Let's grab our GraphQL schema file and parse it with GraphQL
  const schemaPath = join(__dirname, 'schema.graphql')
  const schemaSource = (await readFile(schemaPath)).toString()
  const schema = gql(schemaSource)

  // Return all the types
  return getTypes(schema)
}
