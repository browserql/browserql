export default {
  module: "fpql",
  name: "get-type",
  source: `# fpql

***

![npm](https://img.shields.io/npm/v/@browserql/types)

## get-type

***

Get a type from a schema by name.

***

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
      import getType from '@browserql/fpql/get/type'
      import gql from 'graphql-tag'
      import { join } from 'path'
      import { readFile } from 'fs/promises'

      export default async () => {
        // Let's grab our GraphQL schema file and parse it with GraphQL
        const schemaPath = join(__dirname, 'schema.graphql')
        const schemaSource = (await readFile(schemaPath)).toString()
        const schema = gql(schemaSource)

        // The name of the type we want to get fields from
        const typeName = 'User'

        // Return the type by name
        return getType(typeName)(schema)
      }
    description: Proof of Concept
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
      kind: ObjectTypeDefinition
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

\`\`\`
`
}
