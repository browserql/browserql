import type { DocumentNode } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

/**
 * Build an executable GraphQL schema
 * @param {DocumentNode[]} typeDefs An array of definitions
 * @param {*} directives An object of directives
 */
export default function makeSchema(
  typeDefs: DocumentNode[],
  directives: Record<string, any>
) {
  try {
    return makeExecutableSchema({
      typeDefs,
      schemaDirectives: directives,
    })
  } catch (error) {
    console.log(error)
    throw new Error(`Browserql/Client::Could not make schema::${error.message}`)
  }
}
