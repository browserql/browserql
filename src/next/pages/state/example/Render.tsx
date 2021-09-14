import { gql } from '@apollo/client'
import { find } from 'lodash'
import Provider from './Provider'

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
    <div style={{ background: '#fff', padding: 12, borderRadius: 6 }}>
      <Provider schema={gql(schema)} />
    </div>
  )
}
