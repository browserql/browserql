import { BrowserqlProvider } from '@browserql/react'
import { find } from 'lodash'
import { gql } from '@apollo/client'
import { sayHello } from './resolvers'
import UseQuery from '@browserql/render-props/UseQuery'
import { Typography } from '@material-ui/core'

interface Props {
  files: {
    name: string
    contents: string
  }[]
}

export default function Render({ files }: Props) {
  const { contents: schema } = find(files, { name: 'schema.graphql' }) as {
    name: string
    contents: string
  }

  const { contents: operations } = find(files, {
    name: 'operations.graphql',
  }) as {
    name: string
    contents: string
  }

  return (
    <BrowserqlProvider schema={gql(schema)} queries={{ sayHello }}>
      <UseQuery query={gql(operations)} variables={{ to: 'friends' }}>
        {(data) => (
          <Typography style={{ color: '#fff' }}>{data.sayHello}</Typography>
        )}
      </UseQuery>
    </BrowserqlProvider>
  )
}
