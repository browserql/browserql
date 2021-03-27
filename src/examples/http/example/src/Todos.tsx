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
