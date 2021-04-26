export default {
  module: "firestore",
  name: "delete",
  source: `# firestore

<<<<<<< HEAD
## delete

Delete one or more documents from Firestore.

\`\`\`screens
screens:
  - language: graphql
    source: |-
      type Todo @firestore {
        title: String!
        done: Boolean
      }
    title: schema.graphql
    description: GraphQL schema with our model
    name: schema.gql
  - language: graphql
    source: |-
      mutation deleteTodo($id: ID!) {
        firestoreDeleteTodo(id: $id)
      }
    title: mutation.graphql
    description: GraphQL mutation
    name: mutation.gql
  - language: typescript
    source: |-
      import connect from '@browserql/client'
      import connectFirestore from '@browserql/firestore/connect'

      import schema from './schema.graphql'
      import mutation from './mutation.graphql'
      import db from './db'


      export default async function() {
        const client = connect(schema, connectFirestore(db))
        return client.apollo.mutate({ mutation, variables: { id: 'todo-1' } })
=======
***

## delete

***

Test test test

\`\`\`screens
screens:
  - language: typescript
    source: |-
      export default async function() {
        return 'Hello world!'
>>>>>>> abf364ae224dca22359f7868fa98a090fd9af617
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
<<<<<<< HEAD
    source:
      data:
        firestoreDeleteTodo: todo-1
=======
    source: Hello world!
>>>>>>> abf364ae224dca22359f7868fa98a090fd9af617

\`\`\`
`
}
