export default {
  module: "client",
  name: "example",
  source: `# client

***

## example

***

Creates an in-memory GraphQL server that can be used in the browser.

***

\`\`\`screens
screens:
  - language: graphql
    source: |
      type Query {
        whatTimeIsIt: String !
      }
    description: The GraphQL schema we'll use. For the sake of example it has only
      one query.
    name: schema.graphql
  - language: graphql
    source: |-
      query {
        whatTimeIsIt
      }
    description: The GraphQL executable query we'll use on the client
    name: operations.graphql
  - language: typescript
    source: |
      export function whatTimeIsIt() {
        return new Date().toUTCString()
      }
    description: Our resolvers. Note that it has our query resolver (view schema)
    name: resolvers.ts
  - language: typescript
    source: |
      import connect from '@browserql/client'
      import { readFileSync } from 'fs'
      import { join } from 'path'
      import { parse } from 'graphql'
      import { whatTimeIsIt } from './resolvers'

      const schemaSource = readFileSync(join(__dirname, 'schema.graphql'))
      const schema = parse(schemaSource.toString())

      export default connect(schema, { queries: { whatTimeIsIt }})
    description: The actual client.
    name: client.ts
  - language: typescript
    source: |
      import { readFileSync } from 'fs'
      import { parse } from 'graphql'
      import { join } from 'path'
      import client from './client'

      export default async () => {
        const querySource = readFileSync(join(__dirname, 'operations.graphql'))
        const query = parse(querySource.toString())
        return client.apollo.query({ query })
      }
    description: Using the client to fire a GraphQL query
    name: query.ts
  - language: json
    eval: query.ts
    description: The query result
    name: query.ts
    source:
      data:
        whatTimeIsIt: Thu, 25 Mar 2021 10:16:29 GMT
      loading: false
      networkStatus: 7

\`\`\`
`
}
