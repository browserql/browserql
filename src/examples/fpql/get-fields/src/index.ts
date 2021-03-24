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

  // First we retrieve the type from the schema
  const type = getType(typeName)(schema)

  // Let's throw if no such type
  if (!type) {
    throw new Error('Type not found')
  }

  // If type is found, return its fields
  return getFields(type)
}
