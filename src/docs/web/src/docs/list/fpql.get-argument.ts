export default {
  module: "fpql",
  name: "get-argument",
  source: `# fpql

***

## get-argument

***

Get an input argument

\`\`\`screens
screens:
  - language: grapqhl
    source: |-
      directive @model(collection: String!) on FIELD_DEFINITION

      type User @model(collection: "user63728") {
        email: String !
      }

      type Query {
        getUserByEmail(email: String !): User
      }
    description: The GraphQL schema. We have put arguments inside a field and a directive.
    name: schema.graphql
  - language: typescript
    source: >
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
    description: The GraphQL schema. We have put arguments inside a field and a directive.
    name: index.ts
  - language: graphql
    eval: index.ts
    description: File result
    name: index.ts
    source:
      kind: InputValueDefinition
      description: null
      name:
        kind: Name
        value: email
      type:
        kind: NonNullType
        type:
          kind: NamedType
          name:
            kind: Name
            value: String
      defaultValue: null
      directives: []

\`\`\`
`
}
