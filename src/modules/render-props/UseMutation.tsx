import type { DocumentNode } from 'graphql'
import type { ReactNode } from 'react'

import { FetchResult, useMutation } from '@apollo/client'
import { useState } from 'react'

interface UseMutationProps<Variables = Record<string, any>, Data = any> {
  mutation: DocumentNode
  renderLoading?: ReactNode
  renderError?: ReactNode | ((e: Error) => ReactNode)
  children: (
    mutation: (variables: Variables) => Promise<FetchResult<Data>>,
    args: {
      loading: boolean
      error?: Error
      data?: Data
      called: number
    }
  ) => ReactNode
  mutationProps?: Parameters<typeof useMutation>[1]
}

export default function UseMutation<
  Variables = Record<string, any>,
  Data = any
>(props: UseMutationProps<Variables, Data>) {
  const [mutation, { loading, error, data }] = useMutation(
    props.mutation,
    props.mutationProps
  )
  const [called, setCalled] = useState(0)
  if (error && props.renderError) {
    if (typeof props.renderError === 'function') {
      return props.renderError(error)
    }
    return props.renderError
  }
  if (loading && props.renderLoading) {
    return props.renderLoading
  }
  return props.children(
    async (...args: any[]) => {
      setCalled(called + 1)
      const data = await mutation({ variables: args[0] })
      if (data.data) {
        const [key] = Object.keys(data.data as object)
        return { ...(data.data as any)[key as keyof typeof data.data] }
      }
      return data
    },
    { loading, error, data: data as Data, called }
  )
}
