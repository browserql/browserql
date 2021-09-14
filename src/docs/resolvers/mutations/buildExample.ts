import { resolve, join } from 'path'
import { writeFile } from 'fs/promises'
import type {
  Mutation,
  MutationBuildExampleArgs,
} from '@browserql/docs-graphql/src/generated/graphql'
import { viewExample } from '../queries/viewExample'
import { stepper } from '../utils'

export async function buildExample({
  module: mod,
  example,
}: MutationBuildExampleArgs): Promise<Mutation['buildExample']> {
  console.log('Build Example', { module: mod, example })
  const path = resolve(process.cwd(), '../..', 'docs/web/src/docs')

  const source = await viewExample({ example, module: mod })
  const contents = `export default {
  module: "${mod}",
  name: "${example}",
  source: \`${source.replace(/`/g, '\\`')}\`
}
`
  await writeFile(join(path, `list/${mod}.${example}.ts`), contents)
  return contents
}
