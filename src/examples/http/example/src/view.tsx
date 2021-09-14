import React from 'react'
import { BrowserqlProvider } from '@browserql/react'
import { connectHttp } from '@browserql/http'

import schema from './schema.graphql'
import Todo from './Todo'

export default function () {
  return (
    <BrowserqlProvider
      schema={schema}
      extensions={[
        // @ts-ignore
        connectHttp(),
      ]}
    >
      <Todo />
    </BrowserqlProvider>
  )
}
