export default {
  module: "firestore-react",
  name: "usage",
  source: `# firestore-react

***

## usage

***

Test test test

\`\`\`screens
screens:
  - language: typescript
    source: |-
      export interface FirestoreDocument {
        id: string
      }

      export interface Todo extends FirestoreDocument {
        title: string
        done: boolean
      }
    description: File
    name: types.ts
  - language: typescript
    source: >
      // @ts-ignore

      import { Firestore } from '@browserql/firestore-react'

      import React, { ComponentType } from 'react'

      import { Todo } from './types'


      export interface GetTodosProps {
        todos: Todo[]
        loading: boolean
      }


      export const GetTodos = ({ range = 10 }: { range?: number } = {}) => (
        Component: ComponentType<GetTodosProps>
      ) => () => (
        <Firestore<Todo> get="Todo" range={range}>
          {(todos: Todo[], loading: true) => <Component {...{ todos, loading }} />}
        </Firestore>
      )


      export interface ChangeTodoProps {
        changeTodo: any
        changing: boolean
      }


      export const ChangeTodo = (Component: ComponentType<ChangeTodoProps>) => (
        props: GetTodosProps
      ) => (
        <Firestore<Todo> change="Todo">
          {(changeTodo: any, loading: boolean) => (
            <Component {...{ ...props, changeTodo, changing: loading }} />
          )}
        </Firestore>
      )
    description: File
    name: decorators.tsx
  - language: typescript
    source: >
      import React from 'react'

      import { flowRight } from 'lodash'

      import {
        ChangeTodo,
        ChangeTodoProps,
        GetTodos,
        GetTodosProps,
      } from './decorators'


      function App({
        changeTodo,
        changing,
        loading,
        todos,
      }: GetTodosProps & ChangeTodoProps) {
        return (
          <ul>
            {loading && <li>Loading...</li>}
            {!loading &&
              todos.map((todo) => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    disabled={changing}
                    onClick={() => changeTodo({ id: todo.id }, { done: !todo.done })}
                  />
                  {todo.title}
                </li>
              ))}
          </ul>
        )
      }


      export default flowRight(GetTodos(), ChangeTodo)(App)
    description: File
    name: Todos.tsx
  - language: typescript
    source: >
      import React from 'react'

      import { flowRight } from 'lodash'

      import {
        ChangeTodo,
        ChangeTodoProps,
        GetTodos,
        GetTodosProps,
      } from './decorators'


      function App({
        changeTodo,
        changing,
        loading,
        todos,
      }: GetTodosProps & ChangeTodoProps) {
        return (
          <ul>
            {loading && <li>Loading...</li>}
            {!loading &&
              todos.map((todo) => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    disabled={changing}
                    onClick={() => changeTodo({ id: todo.id }, { done: !todo.done })}
                  />
                  {todo.title}
                </li>
              ))}
          </ul>
        )
      }


      export default flowRight(GetTodos(), ChangeTodo)(App)
    description: File
    name: view.tsx
  - language: json
    eval: foo.ts
    description: File result
    name: foo.ts
    source: hello

\`\`\`
`
}
