import { Query, QueryViewExampleArgs } from '@browserql/docs-graphql/src/generated/graphql'
import { find } from 'lodash'
import { Examples } from '../../docs/list'

export default async function viewExample({ example, module: mod }: QueryViewExampleArgs): Promise<Query['viewExample']> {
  const ex = find(Examples, { module: mod, name: example })
  if (!ex) {
    console.log(Examples)
    throw new Error(`Not found ${mod}.${example}`)
  }
  return ex.source
}