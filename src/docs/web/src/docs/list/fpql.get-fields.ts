export default {
  module: "fpql",
  name: "get-fields",
  source: `# fpql

***

![npm](https://img.shields.io/npm/v/@browserql/types)

## get-fields

***

Get fields from a type

\`\`\`screens
screens:
  - language: graphql
    source: |
      type User {
        id: ID !
        login: String !
        verified: Boolean !
      }
    description: The schema graphql we'll use. Here for our example we want to get
      the fields of type User
    name: schema.graphql
  - language: typescript
    source: |
      import getFields from '@browserql/fpql/get/fields'
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

        // First we retrieve the type from the schema
        const type = getType(typeName)(schema)

        // Let's throw if no such type
        if (!type) {
          throw new Error('Type not found')
        }

        // If type is found, return its fields
        return getFields(type)
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
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
          value: login
        arguments: []
        type:
          kind: NonNullType
          type:
            kind: NamedType
            name:
              kind: Name
              value: String
        directives: []
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
