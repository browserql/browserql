import type { GraphQLSchema } from 'graphql'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import type { Context } from '@browserql/types'

import SchemaLink from './SchemaLink'

/**
 * Create a new Apollo client
 * @param rootValue
 * @param schema
 * @param cache
 * @param context
 */
export default function makeApolloClient(
  rootValue: any,
  schema: GraphQLSchema,
  cache: InMemoryCache,
  context: Context
) {
  return new ApolloClient({
    // @ts-ignore
    link: new SchemaLink({
      rootValue,
      schema,
      context: () => context,
    }),
    cache,
  })
}
