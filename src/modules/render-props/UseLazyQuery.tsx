import { LazyQueryResult, QueryLazyOptions, useLazyQuery } from '@apollo/client'
import { DocumentNode } from 'graphql'
import { ReactElement } from 'react'

interface Props<
  Data extends Record<string, any> = Record<string, any>,
  Variables extends Record<string, any> = Record<string, any>
> {
  query: DocumentNode
  children(
    get: (options: QueryLazyOptions<Variables>) => void,
    results: LazyQueryResult<Data, Variables>
  ): ReactElement
}

export default function UseLazyQuery<
  Data extends Record<string, any> = Record<string, any>,
  Variables extends Record<string, any> = Record<string, any>
>(props: Props<Data, Variables>) {
  const [get, tuple] = useLazyQuery<Data, Variables>(props.query)

  return props.children(get, tuple)
}
