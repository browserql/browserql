import { resolve, join } from 'path';
import { writeFile } from 'fs/promises'
import type { Mutation, MutationBuildExampleArgs } from '@browserql/docs-graphql/src/generated/graphql';
import { viewExample } from '../queries/viewExample';

export async function buildExample({ module: mod, example }: MutationBuildExampleArgs): Promise<Mutation['buildExample']> {
  const source = await viewExample({ example, module: mod })
  const path = resolve(
    process.cwd(),
    '../..',
    'docs/web/src/docs'
  )
  const contents = `export default {
  module: "${mod}",
  name: "${example}",
  source: \`${source.replace(/`/g, '\\`')}\`
}
`
  await writeFile(join(path, `list/${mod}.${example}.ts`), contents)
  return contents
}
