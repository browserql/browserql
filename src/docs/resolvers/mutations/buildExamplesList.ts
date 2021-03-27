import { resolve, join } from 'path';
import { readdir, writeFile } from 'fs/promises'
import { camelCase } from 'lodash'
import type { Mutation } from '@browserql/docs-graphql/src/generated/graphql';
import { buildExample } from './buildExample';
import { buildEmbedded } from './buildEmbedded';

interface Example { module: string, name: string }

export async function buildExamplesList(): Promise<Mutation['buildExamplesList']> {
  try {
    const examplesPath = resolve(
      process.cwd(),
      '../..',
      'examples'
    )
    const webDocsPath = resolve(
      process.cwd(),
      '../..',
      'docs/web/src/docs/list'
    )
    const modules = await readdir(examplesPath)
    const items = await Promise.all(
      modules.map(mod => readdir(join(examplesPath, mod)))
    )
    const examplesByModule: Example[] = []
    items.forEach((moduleExamples, index) => {
      const mod = modules[index]
      moduleExamples.forEach(example => {
        examplesByModule.push({ module: mod, name: example })
      })
    })
    await Promise.all(
      examplesByModule.map(async example => {
        await buildExample({ example: example.name, module: example.module })
      })
    )
    const listItems = await readdir(webDocsPath)
    const listImports = listItems
      .map(item => {
        const itemName = item.replace(/\.ts$/, '')
        return `import ${camelCase(itemName)} from './list/${itemName}'`
      })
      .join('\n')
    const list = listItems
      .map(item => camelCase(item.replace(/\.ts$/, '')))
      .join(',\n  ')
    const listSource = `${listImports}\n\nexport const Examples = [\n  ${list}\n]\n`
    await writeFile(`${webDocsPath}.ts`, listSource)
    await buildEmbedded()
    return examplesPath
  } catch (error) {
    console.log(error)
    throw error
  }
}
