export default {
  module: "fpql",
  name: "get-type-name",
  source: `## fpql::getName | Get type's name

Example on how to use \`getName\` to get the name of a type

\`\`\`screens
screens:
  - language: graphql
    source: type Foo
    name: schema.graphql
  - language: typescript
    source: >
      import getName from '@browserql/fpql/get/name'

      import getType from '@browserql/fpql/get/type'

      import { readFile } from 'fs/promises'

      import gql from 'graphql-tag'

      import { join } from 'path'


      export default async () => {
        const schema = gql((await readFile(join(__dirname, 'schema.graphql'))).toString())
        const type = getType('Foo')(schema)
        return getName(type)
      }
    name: index.ts
  - language: json
    eval: index.ts
    name: index.ts
    source: Foo

\`\`\`
`
}
