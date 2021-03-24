export default {
  module: "fpql",
  name: "get-types",
  source: `# fpql

***

## get-types

***

Test test test

\`\`\`screens
screens:
  - language: graphql
    source: |
      type User {
        id: ID!
        settings: UserSettings!
      }

      type UserSettings {
        verified: Boolean!
      }
    description: The schema graphql we'll use
    name: schema.graphql
  - language: typescript
    source: |
      import getTypes from '@browserql/fpql/get/types'
      import gql from 'graphql-tag'
      import { join } from 'path'
      import { readFile } from 'fs/promises'

      export default async () => {
        // Let's grab our GraphQL schema file and parse it with GraphQL
        const schemaPath = join(__dirname, 'schema.graphql')
        const schemaSource = (await readFile(schemaPath)).toString()
        const schema = gql(schemaSource)

        // Return all the types
        return getTypes(schema)
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
      - kind: ObjectTypeDefinition
        description: null
        name:
          kind: Name
          value: User
        interfaces: []
        directives: []
        fields:
          - kind: FieldDefinition
            description: null
            name:
              kind: Name
              value: id
            arguments: []
            type:
              kind: NonNullType
              type:
                kind: NamedType
                name:
                  kind: Name
                  value: ID
            directives: []
          - kind: FieldDefinition
            description: null
            name:
              kind: Name
              value: settings
            arguments: []
            type:
              kind: NonNullType
              type:
                kind: NamedType
                name:
                  kind: Name
                  value: UserSettings
            directives: []
      - kind: ObjectTypeDefinition
        description: null
        name:
          kind: Name
          value: UserSettings
        interfaces: []
        directives: []
        fields:
          - kind: FieldDefinition
            description: null
            name:
              kind: Name
              value: verified
            arguments: []
            type:
              kind: NonNullType
              type:
                kind: NamedType
                name:
                  kind: Name
                  value: Boolean
            directives: []

\`\`\`
`
}
