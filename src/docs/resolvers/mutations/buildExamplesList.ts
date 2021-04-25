import { resolve, join } from 'path';
import { readdir, writeFile, unlink } from 'fs/promises'
import { camelCase } from 'lodash'
import type { Mutation } from '@browserql/docs-graphql/src/generated/graphql';
import { buildExample } from './buildExample';
import { buildEmbedded } from './buildEmbedded';
import { stepper } from '../utils';

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
    const examplesByModule: Example[] = []

    interface Steps  {
      'Get modules': string[]
      'Get items': string[][]
      'Get list items': string[]
    }

    await stepper<Steps>()(
      [
        'Empty dcos list',
        async () => {
          const listItems = await readdir(webDocsPath)
          await Promise.all(
            listItems.map(item => unlink(join(webDocsPath, item)))
          )
        }
      ],
      
      [
        'Get modules',
        () => readdir(examplesPath)
      ],
      
      [
        'Get items',
        steps => Promise.all(
          (steps['Get modules'] as Steps['Get modules']).map(mod => readdir(join(examplesPath, mod)))
        ),
      ],
      
      [
        'Populate examples by module',
        async steps => {
          (steps['Get items'] as Steps['Get items']).forEach((moduleExamples, index) => {
            const mod = (steps['Get modules'] as Steps['Get modules'])[index]
            moduleExamples.forEach(example => {
              examplesByModule.push({ module: mod, name: example })
            })
          })
        },
      ],

      [
        'Build each example',
        () => Promise.all(
          examplesByModule.map(async example => {
            try {
              await buildExample({ example: example.name, module: example.module })
            } catch (error) {
              console.log(error)
              throw new Error(`Failed to build ${JSON.stringify(example)}: ${error.message}`)
            }
          })
        )
      ],

      [
        'Get list items',
        () => readdir(webDocsPath)
      ],

      [
        'Write new list',
        async steps => {
          const listImports = (steps['Get list items'] as Steps['Get list items'])
            .map(item => {
              const itemName = item.replace(/\.ts$/, '')
              return `import ${camelCase(itemName)} from './list/${itemName}'`
            })
            .join('\n')
          const list = (steps['Get list items'] as Steps['Get list items'])
            .map(item => camelCase(item.replace(/\.ts$/, '')))
            .join(',\n  ')
          const listSource = `${listImports}\n\nexport const Examples = [\n  ${list}\n]\n`
          await writeFile(`${webDocsPath}.ts`, listSource)
        }
      ],

      [
        'Build embedded',
        buildEmbedded
      ]


    )
    
    return examplesPath
  } catch (error) {
    console.log(error)
    throw error
  }
}
