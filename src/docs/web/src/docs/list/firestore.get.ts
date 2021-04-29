export default {
  module: "firestore",
  name: "get",
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
        firestoreGetTodo {
          title
          done
          id
        }
      }
    description: File
    name: query.gql
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
      import query from './query.graphql'
      import db from './db'

      export default async function() {
        const client = connect(schema, connectFirestore(db))
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
        firestoreGetTodo:
          - title: Buy milk
            done: true
            id: "1"
            __typename: Todo
          - title: Wash dishes
            done: true
            id: "2"
            __typename: Todo
          - title: Meditate
            done: true
            id: "3"
            __typename: Todo
      loading: false
      networkStatus: 7

\`\`\`
`
}
