import { BrowserqlContext } from '@browserql/react'
import React, { useContext } from 'react'
import makeState from '@browserql/state'

import query from './query.graphql'

export default function Counter() {
  const ctx = useContext(BrowserqlContext)
  const State = makeState(ctx.cache, ctx.schema)
  return (
    <State query={query}>
      {() => (
        <div>
          <div>Counter: 0</div>
        </div>
      )}
    </State>
  )
}
