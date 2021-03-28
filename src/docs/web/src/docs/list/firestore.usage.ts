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
    source: |
      import connect from '@browserql/client'
      import connectFirestore from '@browserql/firestore/connect'

      import schema from './schema.graphql'
      import query from './query.graphql'
      import db from './db'

      export default async function() {
        const client = connect(schema, connectFirestore(db, schema))
        return client.apollo.query({ query })
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
      data:
        firestoreGetTodo: []
      loading: false
      networkStatus: 7

\`\`\`
`
}
