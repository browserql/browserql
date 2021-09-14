import type { DocumentNode } from 'graphql'
import { BrowserqlProvider } from '@browserql/react'
import Counter from './Counter'

interface Props {
  schema: DocumentNode
}

export default function Provider({ schema }: Props) {
  return (
    <BrowserqlProvider schema={schema}>
      <Counter />
    </BrowserqlProvider>
  )
}
