import { resolve, join } from 'path';
import { readFile, writeFile } from 'fs/promises'
import fromMarkdown from 'mdast-util-from-markdown'
import YAML from 'yaml'

export async function buildEmbedded({ module: mod, example }: { module: string, example: string}) {
  const path = resolve(
    process.cwd(),
    '../../examples',
    mod,
    example
  )
  const README = (await readFile(join(path, 'README.md'))).toString()
  const tree = fromMarkdown(README)
  const { default: embedded } = require('@browserql/docs-web/src/embedded')
  const all = embedded.map((ex: any) => ({
    module: ex.module,
    example: ex.example
  }))
  await Promise.all(
    tree.children.map(async child => {
      if (child.type === 'code' && child.lang === 'screens') {
        const parsed = YAML.parse(child.value) as { screens: { 
          language: string
          source?: string
          eval?: string
        }[]}
        const screens = await Promise.all(
          parsed.screens.map(async screen => {
            if (screen.eval && screen.language === 'react') {
              const exists = all.find((a: any) => a.module === mod && a.example === example)
              if (!exists) {
                all.push({ module: mod, example })
              }
            }
            return screen
          })
        )
        return {
          ...child,
          value: YAML.stringify({ screens })
        }
      }
      return child
    })
  )
  const squashed = `export default [
  ${
    all.map((i: any) => `{
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
  return squashed
}
