export default {
  module: "cache",
  name: "usage",
  source: `# cache

***

## usage

***

Helper around [apollo-cache](https://www.apollographql.com/docs/react/caching/cache-configuration/)

\`\`\`javascript
import connectCache from '@browserql/cache'

const cached = connectCache(cache, schema)

cached.get(QUERY, {})
cached.set(QUEY, {}, {})
\`\`\`

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
    description: Generate client
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
    description: File
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
