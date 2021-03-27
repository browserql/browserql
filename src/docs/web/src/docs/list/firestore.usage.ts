export default {
  module: "firestore",
  name: "usage",
  source: `# firestore

***

## usage

***

Connect Firestore to your front-end and manage your queries

\`\`\`screens
screens:
  - language: graphql
    title: schema.graphql
    source: |
      type Todo @firestore {
        title: String!
        done: Boolean!
      }
    description: The GraphQL schema we'll use. Note how we use the @firestore directive.
    name: schema.gql
  - language: graphql
    title: query.graphql
    source: |
      query {
        firestoreGetTodo(
          where: { field: "done" equals: true }
          range: 10
          sortBy: "title"
        ) {
          title
        }
      }
    description: File
    name: query.gql
  - language: typescript
    source: |-
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
