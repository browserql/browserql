export default {
  module: "state",
  name: "example",
  source: `# state

***

## example

***

Test test test

\`\`\`screens
screens:
  - language: graphql
    title: schema.graphql
    source: |
      type Query {
        getCounter: Int!
      }
    description: GraphQL schema
    name: schema.gql
  - language: graphql
    title: query.graphql
    source: |-
      query {
        getCounter
      }
    description: GraphQL query
    name: query.gql
  - language: typescript
    source: >
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
                <div>Counter: {counter}</div>
                <button onClick={() => set({ getCounter: counter + 1 })}>+</button>
              </div>
            )}
          </State>
        )
      }
    description: File
    name: Counter.tsx
  - language: typescript
    source: |
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
