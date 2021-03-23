import getName from '@browserql/fpql/get/name'
import getType from '@browserql/fpql/get/type'
import { readFile } from 'fs/promises'
import gql from 'graphql-tag'
import { join } from 'path'

export default async () => {
  const schema = gql((await readFile(join(__dirname, 'schema.graphql'))).toString())
  const type = getType('Foo')(schema)
  return getName(type)
}
