import { UseQuery } from '@browserql/react';
import React from 'react';

import query from './query.graphql';

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

interface GetTodoData {
  getTodo: Todo | null;
}

function GetTodoError(error: Error) {
  return (
    <div style={{ color: '#900', fontWeight: 'bold' }}>
      Error: {error.message}
    </div>
  );
}

function GetTodoLoading() {
  return <div style={{ color: '#666', fontStyle: 'italic' }}>Loading</div>;
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
  );
}
