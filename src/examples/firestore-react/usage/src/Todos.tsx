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
