import getFields from '@browserql/fpql/get/fields'
import getType from '@browserql/fpql/get/type'
import gql from 'graphql-tag'
import { join } from 'path'
import { readFile } from 'fs/promises'

export default async () => {
  // Let's grab our GraphQL schema file and parse it with GraphQL
  const schemaPath = join(__dirname, 'schema.graphql')
  const schemaSource = (await readFile(schemaPath)).toString()
  const schema = gql(schemaSource)

  // The name of the type we want to get fields from
  const typeName = 'User'

  // Return the type by name
  return getType(typeName)(schema)
}
