export default {
  module: "client",
  name: "example",
  source: `# client

***

## example

***

Creates an in-memory GraphQL server that can be used in the browser.

***

\`\`\`screens
screens:
  - language: graphql
    source: |
      type Query {
        whatTimeIsIt: String !
      }
    description: The GraphQL schema we'll use. For the sake of example it has only
      one query.
    name: schema.graphql
  - language: graphql
    source: |-
      query {
        whatTimeIsIt
      }
    description: The GraphQL executable query we'll use on the client
    name: operations.graphql
  - language: typescript
    source: |
      export function whatTimeIsIt() {
        return new Date().toUTCString()
      }
    description: Our resolvers. Note that it has our query resolver (view schema)
    name: resolvers.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source: 1

\`\`\`
`
}
