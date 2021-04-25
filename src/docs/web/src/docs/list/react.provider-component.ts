export default {
  module: "react",
  name: "provider-component",
  source: `# react

***

![npm](https://img.shields.io/npm/v/@browserql/react)

## Provider component

***

Test test test

\`\`\`screens
screens:
  - language: graphql
    source: |
      type Query {
        getUsers: [User!]
      }

      type User {
        id: ID!
        login: String!
      }
    description: The GraphQL schema we'll use
    name: schema.gql
  - language: graphql
    source: |-
      query {
        getUsers {
          id
          login
        }
      }
    description: The GraphQL client query
    name: query.gql
  - language: typescript
    source: |-
      export async function getUsers() {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return [
          { id: 1, login: 'abc' },
          { id: 2, login: 'def' },
          { id: 3, login: 'ghi' },
        ]
      }
    description: The resolvers
    name: resolvers.ts
  - language: typescript
    source: |
      import React from 'react'
      import UseQuery from '@browserql/render-props/UseQuery'

      import query from './query.graphql'

      interface User {
        id: string
        login: string
      }

      interface QueryData {
        getUsers: User[]
      }

      export default function Users() {
        return (
          <UseQuery<QueryData> query={query} renderLoading={<div>Loading</div>}>
            {({ getUsers: users }) => (
              <ul>
                {users.map((user) => (
                  <li key={user.id}>{user.login}</li>
                ))}
              </ul>
            )}
          </UseQuery>
        )
      }
    description: File
    name: Users.tsx
  - language: typescript
    source: |
      import React from 'react';
      import { BrowserqlProvider } from '@browserql/react';

      import schema from './schema.graphql';
      import Users from './Users';
      import { getUsers } from './resolvers';

      export default function View() {
        return (
          <BrowserqlProvider schema={schema} queries={{ getUsers }}>
            <Users />
          </BrowserqlProvider>
        );
      }
    description: File
    name: view.tsx
  - language: react
    eval: view.tsx
    description: File result
    name: view.tsx
    source: ""

\`\`\`
`
}
