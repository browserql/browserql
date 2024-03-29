import React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router'

import UseQuery from '@browserql/render-props/UseQuery'
import { Query } from '@browserql/docs-graphql/src/generated/graphql'

import MD from './MD'

const QUERY = gql`
  query ViewExample($example: String!, $module: String!) {
    viewExample(example: $example, module: $module)
  }
`

function ExampleError(error: Error) {
  console.log(error)
  return <div>Error getting example: {error.message}</div>
}

export default function Example({
  match: {
    params: { example, module: mod },
  },
}: RouteComponentProps<{ module: string; example: string }>) {
  return (
    <UseQuery<{ viewExample: Query['viewExample'] }>
      query={QUERY}
      renderError={ExampleError}
      variables={{ example, module: mod }}
    >
      {({ viewExample }) => <MD doc={viewExample} />}
    </UseQuery>
  )
}
