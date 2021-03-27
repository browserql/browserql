import { BrowserqlContext } from '@browserql/react'
import React, { useContext } from 'react'
import makeState from '@browserql/state'

import query from './query.graphql'

export default function Counter() {
  const ctx = useContext(BrowserqlContext)
  const State = makeState(ctx.cache, ctx.schema)
  return (
    <State query={query}>
      {({ getCounter: counter = 0 }, set) => (
        <div>
          <span>Counter: {counter}</span>
          <button
            onClick={() => set({ getCounter: counter + 1 })}
            style={{ marginLeft: 12 }}
          >
            +
          </button>
        </div>
      )}
    </State>
  )
}
