export default {
  module: "http",
  name: "example",
  source: `# http

***

## example

***

Test test test

\`\`\`screens
screens:
  - language: graphql
    title: schema.graphql
    source: |
      type Query {
        getTodo(id: ID!): Todo
          @http(url: "https://jsonplaceholder.typicode.com/todos/:id")
      }

      type Todo {
        completed: Boolean!
        id: ID!
        title: String!
        userId: ID!
      }
    description: GraphQL schema
    name: schema.gql
  - language: graphql
    title: query.graphql
    source: |
      query {
        getTodo(id: 2) {
          completed
          id
          title
          userId
        }
      }
    description: GraphQL query
    name: query.gql
  - language: typescript
    source: |
      import UseQuery from '@browserql/render-props/UseQuery'
      import React from 'react'

      import query from './query.graphql'

      interface Todo {
        completed: boolean
        id: number
        title: string
        userId: number
      }

      interface GetTodoData {
        getTodo: Todo | null
      }

      function GetTodoError(error: Error) {
        return (
          <div style={{ color: '#900', fontWeight: 'bold' }}>
            Error: {error.message}
          </div>
        )
      }

      function GetTodoLoading() {
        return <div style={{ color: '#666', fontStyle: 'italic' }}>Loading</div>
      }

      export default function Todos() {
        return (
          <UseQuery<GetTodoData>
            query={query}
            renderError={GetTodoError}
            renderLoading={<GetTodoLoading />}
          >
            {({ getTodo: todo }) => <pre>{JSON.stringify(todo, null, 2)}</pre>}
          </UseQuery>
        )
      }
    description: File
    name: Todo.tsx
  - language: typescript
    source: |
      import React from 'react';
      import { BrowserqlProvider } from '@browserql/react';
      import { connectHttp } from '@browserql/http';

      import schema from './schema.graphql';
      import Todo from './Todo';

      export default function () {
        return (
          <BrowserqlProvider schema={schema} extensions={[connectHttp()]}>
            <Todo />
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
