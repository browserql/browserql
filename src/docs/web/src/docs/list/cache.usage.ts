export default {
  module: "cache",
  name: "usage",
  source: `# cache

***

## usage

***

Helper around [apollo-cache](https://www.apollographql.com/docs/react/caching/cache-configuration/)

\`\`\`screens
screens:
  - language: graphql
    source: |-
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
    source: |
      import connectCache from '@browserql/cache'
      import gql from 'graphql-tag'
      import client from './client'

      export default async function() {
        // Create the cache wrapper
        const cached = connectCache(client.cache, client.schema)
        // Our query
        const query = gql\`{ getCounter }\`
        // Initial value
        const initialValue = cached.get(query)
        // Set cache
        cached.set(query, { getCounter: 100 })
        // Cache new value
        const valueAfterChange = cached.get(query)
        return {
          initialValue,
          valueAfterChange
        }
      }
    description: "In this file we are showing basic cache usage: how to get and set
      the cache"
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
      initialValue:
        ? getCounter
      valueAfterChange:
        getCounter: 100

\`\`\`
`
}
