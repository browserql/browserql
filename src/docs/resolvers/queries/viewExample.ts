import { resolve, join } from 'path'
import { readFile } from 'fs/promises'
import type {
  Query,
  QueryViewExampleArgs,
} from '@browserql/docs-graphql/src/generated/graphql'
import fromMarkdown from 'mdast-util-from-markdown'
import toMarkdown from 'mdast-util-to-markdown'
import YAML from 'yaml'

export async function viewExample({
  module: mod,
  example,
}: QueryViewExampleArgs): Promise<Query['viewExample']> {
  try {
    const path = resolve(process.cwd(), '../../examples', mod, example)
    console.log(path)
    const README = (await readFile(join(path, 'README.md'))).toString()
    const tree = fromMarkdown(README)
    const nextChildren = await Promise.all(
      tree.children.map(async (child) => {
        if (child.type === 'code' && child.lang === 'screens') {
          const parsed = YAML.parse(child.value) as {
            screens: {
              language: string
              source?: string
              eval?: string
            }[]
          }
          const screens = await Promise.all(
            parsed.screens.map(async (screen) => {
              if (screen.source) {
                return {
                  ...screen,
                  name: screen.source,
                  source: (
                    await readFile(join(path, 'src', screen.source))
                  ).toString(),
                }
              }
              if (screen.eval) {
                if (screen.language === 'react') {
                  return {
                    ...screen,
                    name: screen.eval,
                    source: '',
                  }
                }
                const { default: fn } = require(join(path, 'src', screen.eval))
                return {
                  ...screen,
                  name: screen.eval,
                  source: await fn(),
                }
              }
              return screen
            })
          )
          return {
            ...child,
            value: YAML.stringify({ screens }),
          }
        }
        return child
      })
    )
    return toMarkdown({ ...tree, children: nextChildren })
  } catch (error) {
    console.log(error)
    throw error
  }
}
