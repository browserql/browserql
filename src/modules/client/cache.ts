import { InMemoryCache } from '@apollo/client'

/**
 * Make cache
 */
export default function makeCache() {
  return new InMemoryCache({
    addTypename: true,
    // fragmentMatcher: new IntrospectionFragmentMatcher({
    //   introspectionQueryResultData: {
    //     __schema: {
    //       types: [],-
    //     },
    //   },
    // }),
  })
}
