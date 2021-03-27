import React from 'react'
import { BrowserqlProvider } from '@browserql/react'

import schema from './schema.graphql'
import Counter from './Counter'

export default function App() {
  return (
    <BrowserqlProvider schema={schema}>
      <Counter />
    </BrowserqlProvider>
  )
}
