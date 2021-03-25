import { readFileSync } from 'fs'
import { parse } from 'graphql'
import { join } from 'path'
import client from './client'

export default async () => {
  const querySource = readFileSync(join(__dirname, 'operations.graphql'))
  const query = parse(querySource.toString())
  return client.apollo.query({ query })
}
