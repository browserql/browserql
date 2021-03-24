import getName from '@browserql/fpql/get/name'
import getType from '@browserql/fpql/get/type'
import { readFile } from 'fs/promises'
import gql from 'graphql-tag'
import { join } from 'path'

export default async () => {
  const schema = (await readFile(join(__dirname, 'schema.graphql'))).toString()
  const type = getType('Foo')(gql(schema))
  return getName(type)
}
