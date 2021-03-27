export default {
  module: "cache",
  name: "get",
  source: `# cache

***

## get

***

Get value from cache.

\`\`\`screens
screens:
  - language: graphql
    source: |
      type Query {
        getCounter: Int
      }
    description: The GraphQL schema we'll use
    name: schema.graphql
  - language: typescript
    source: |
      import connect from '@browserql/client'
      import { readFileSync } from 'fs'
      import { join } from 'path'
      import { parse } from 'graphql'

      const schemaSource = readFileSync(join(__dirname, 'schema.graphql'))
      const schema = parse(schemaSource.toString())

      export default connect(schema)
    description: Generate client with browserql
    headsUp: You can also use Apollo's client -- or any GraphQL client you deem fit
    name: client.ts
  - language: typescript
    source: |-
      import connectCache from '@browserql/cache'
      import gql from 'graphql-tag'
      import client from './client'

      export default async function() {
        // Create the cache wrapper
        const cached = connectCache(client.cache, client.schema)
        // Our query
        const query = gql\`{ getCounter }\`
        // Get cache value
        return cached.get(query)
      }
    description: "In this file we are showing basic cache usage: how to get and set
      the cache"
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
      ? getCounter

\`\`\`
`
}
