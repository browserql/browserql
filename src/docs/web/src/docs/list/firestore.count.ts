export default {
  module: "firestore",
  name: "count",
  source: `# firestore

***

## Count

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
        firestoreCount_Todo
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
        firestoreCount_Todo: 3
      loading: false
      networkStatus: 7

\`\`\`
`
}
