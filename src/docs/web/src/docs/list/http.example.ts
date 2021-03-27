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
    name: schema.graphql
  - language: graphql
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
      import { UseQuery } from '@browserql/react';
      import React from 'react';
      import { parse } from 'graphql';
      import query from './query.gql';

      interface Todo {
        completed: boolean;
        id: string | number;
        title: string;
        userId: string | number;
      }

      interface GetTodoData {
        getTodos: Todo[];
      }

      export default function Todos() {
        return (
          <UseQuery<GetTodoData> query={parse(query)}>
            {({ getTodos: todos }) => (
              <ul>
                {todos.map(todo => (
                  <li key={todo.id}>
                    <input type='checkbox' checked={todo.completed} />
                    {todo.title}
                  </li>
                ))}
              </ul>
            )}
          </UseQuery>
        );
      }
    description: File
    name: Todos.tsx
  - language: typescript
    source: >
      import React from 'react';

      import { BrowserqlProvider } from '@browserql/react';

      import { connectHttp } from '@browserql/http';

      import { parse } from 'graphql';


      import schema from './schema.graphql';

      import Todos from './Todos';


      export default async function () {
        return (
          <BrowserqlProvider schema={parse(schema)} extensions={[connectHttp()]}>
            <Todos />
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
