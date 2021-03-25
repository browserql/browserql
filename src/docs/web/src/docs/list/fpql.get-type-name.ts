export default {
  module: "fpql",
  name: "get-type-name",
  source: `# fpql

***

![npm](https://img.shields.io/npm/v/@browserql/types)

## getName

***

### Get type's name

***

Example on how to use \`getName\` to get the name of a type

\`\`\`screens
screens:
  - language: graphql
    source: type Foo
    description: The schema graphql with the type in it. Here we omit fields since
      we are not concerned by them in this example.
    name: schema.graphql
  - language: typescript
    source: >
      import getName from '@browserql/fpql/get/name'

      import getType from '@browserql/fpql/get/type'

      import { readFile } from 'fs/promises'

      import gql from 'graphql-tag'

      import { join } from 'path'


      export default async () => {
        const schema = (await readFile(join(__dirname, 'schema.graphql'))).toString()
        const type = getType('Foo')(gql(schema))
        return getName(type)
      }
    description: Proof of concept -- Get type's name with fpql
    name: index.ts
  - language: json
    eval: index.ts
    description: This is the result. As you can see, the right name is returned
    name: index.ts
    source: Foo

\`\`\`
`
}
