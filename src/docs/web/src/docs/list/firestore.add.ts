export default {
  module: "firestore",
  name: "add",
  source: `# firestore

## Add

Add document

***

\`\`\`screens
screens:
  - language: graphql
    title: schema.graphql
    source: |
      type Todo @firestore {
        title: String!
        done: Boolean!
      }
    description: The GraphQL schema we'll use. Note how we use the @firestore
      directive. It means this GraphQL type represents a firestore collection.
    name: schema.gql
  - language: graphql
    title: mutation.graphql
    source: |
      mutation {
        firestoreAdd_Todo(Todo: {
          title: "Buy milk"
          done: false
        }) {
          title
          done
          id
        }
      }
    description: File
    name: mutation.gql
  - language: typescript
    source: |
      import firebase from 'firebase/app'
      import 'firebase/firestore'

      const firestoreConfig = {
        apiKey: process.env.FIRESTORE_API_KEY,
        projectId: process.env.FIRESTORE_PROJECT_ID,
        appId: process.env.FIRESTORE_AP_ID,
        authDomain: process.env.FIRESTORE_AUTH_DOMAIN
      }

      firebase.initializeApp(firestoreConfig)

      export default firebase.firestore()
    title: db.ts
    description: File
    name: db-demo.ts
  - language: typescript
    source: |
      import connect from '@browserql/client'
      import connectFirestore from '@browserql/firestore/connect'

      import schema from './schema.graphql'
      import mutation from './mutation.graphql'
      import db from './db'

      export default async function() {
        const client = connect(schema, connectFirestore(db))
        return client.apollo.mutate({ mutation })
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source:
      data:
        firestoreAdd_Todo:
          title: Buy milk
          done: false
          id: gbpe5
          __typename: Todo

\`\`\`
`
}
