import { resolve, join } from 'path';
import { readFile, writeFile, readdir } from 'fs/promises'
import fromMarkdown from 'mdast-util-from-markdown'
import YAML from 'yaml'
import { compact } from 'lodash'

interface Example { module: string, name: string }

async function buildEmbeddedOne({ module: mod, example }: { module: string, example: string}) {
  const path = resolve(
    process.cwd(),
    '../../examples',
    mod,
    example
  )
  const README = (await readFile(join(path, 'README.md'))).toString()
  const tree = fromMarkdown(README)
  const all: { module: string, example: string }[] = []
  await Promise.all(
    tree.children.map(async child => {
      if (child.type === 'code' && child.lang === 'screens') {
        const parsed = YAML.parse(child.value) as { screens: { 
          language: string
          source?: string
          eval?: string
        }[]}
        await Promise.all(
          parsed.screens.map(async screen => {
            if (screen.eval && screen.language === 'react') {
              all.push({ module: mod, example })
            }
            return screen
          })
        )
      }
      return child
    })
  )
  return all
}

export async function buildEmbedded() {
  const examplesPath = resolve(
    process.cwd(),
    '../..',
    'examples'
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
  const all = await Promise.all(
    examplesByModule.map(ex => buildEmbeddedOne({ module: ex.module, example: ex.name }))
  )
  const embedded: any[] = []
  all.forEach(a => {
    a.forEach(b => embedded.push(b))
  })
  const squashed = `export default [
    ${
      embedded.map((i: any) => `{
    module: '${i.module}',
    example: '${i.example}',
    async load() {
      const { default: View } = await import(
        '@browserql/example-${i.module}.${i.example}/src/view'
      );
      return View;
    }
  }`).join(',')
    }
]
  `
  await writeFile(resolve(process.cwd(), '../..', 'docs/web/src/embedded.ts'), squashed)
}
