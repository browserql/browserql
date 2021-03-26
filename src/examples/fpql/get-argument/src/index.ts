import getArgument from '@browserql/fpql/get/argument'
import getQuery from '@browserql/fpql/get/query'
import { readFile } from 'fs/promises'
import gql from 'graphql-tag'
import { join } from 'path'

export default async () => {
  const schema = (await readFile(join(__dirname, 'schema.graphql'))).toString()
  const query = getQuery('getUserByEmail')(gql(schema))
  if (!query) {
    return 'OUCH'
  }
  return getArgument('email')(query)
}
