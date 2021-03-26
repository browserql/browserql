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
      import cache from '@browserql/cache'

      export default async function() {
        return 'Hello world!'
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source: Hello world!

\`\`\`
`
}
