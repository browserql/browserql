import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises'
import {template, templateSettings } from 'lodash'
import { join } from 'path'

export async function copyAndTransformFile(src: string, destination: string, transformer: (source: string) => Promise<string>) {
  const source = (await readFile(src)).toString()
  const nextSource = await transformer(source)
  await writeFile(destination, nextSource)
  return nextSource
}

export function parseTemplate(tpl: string, options: Record<string, any>) {
  const oldValue = templateSettings.interpolate
  templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const compiled = template(tpl)
  return compiled(options)
}

export async function copyOver(source: string, destination: string, options: Record<string, any> = {}) {
  const files = await readdir(source)
  await Promise.all(
    files.map(async file => {
      const stats = await stat(join(source, file))
      if (stats.isFile()) {
        await copyAndTransformFile(
          join(source, file),
          join(destination, 'package.json'),
          async source => parseTemplate(source, options)
        )
      } else if (stats.isDirectory()) {
        await mkdir(join(destination, file))
        await copyOver(join(source, file), join(destination, file), options)
      }
    })
  )
}
