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
