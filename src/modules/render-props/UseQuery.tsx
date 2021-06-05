import React, { Fragment, ReactElement } from 'react'
import type { DocumentNode } from 'graphql'
import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'

type UseQueryRenderer<
  Data extends Record<string, any> = Record<string, any>,
  Variables extends Record<string, any> = Record<string, any>
> = (data: Data, result: QueryResult<Data, Variables>) => React.ReactElement

type UseQueryEachRenderer<D = any> = (
  item: D,
  index: number,
  data: D[],
  loading: boolean,
  error: Error | undefined
) => ReactElement

type UseQueryProps<
  Data extends Record<string, any> = Record<string, any>,
  Variables extends Record<string, any> = Record<string, any>
> = {
  children: UseQueryRenderer<Data>
  dontRenderError?: boolean
  dontRenderLoading?: boolean
  query: DocumentNode
  queryProps?: Parameters<typeof useQuery>[1]
  renderEach?: UseQueryEachRenderer<Data>
  renderEmpty?: ReactElement
  renderError?: ReactElement | ((e: Error) => ReactElement)
  renderLoading?: ReactElement
  renderNull?: ReactElement
  variables?: Variables
}
export default function UseQuery<
  Data extends Record<string, any> = Record<string, any>,
  Variables extends Record<string, any> = Record<string, any>
>(props: UseQueryProps<Data>) {
  try {
    const options: QueryHookOptions<Data, Variables> = {}

    if (props.variables) {
      options.variables = props.variables as Variables
    }

    const tuple = useQuery<Data, Variables>(props.query, options)

    if (tuple.error) {
      throw tuple.error
    }

    if (tuple.loading && props.renderLoading) {
      return props.renderLoading
    }

    return props.children(tuple.data as Data, tuple)
  } catch (error) {
    if (typeof props.renderError === 'function') {
      return props.renderError(error)
    }
    if (props.renderError) {
      return props.renderError
    }
    return <Fragment />
  }
}
