import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import {template, templateSettings } from 'lodash'
import { exec } from 'child_process'
import { promisify } from 'util'

const [,, exampleModule, exampleName] = process.argv

const example = {
  name: exampleName,
  module: exampleModule
}

async function copyAndTransformFile(src: string, destination: string, transformer: (source: string) => Promise<string>) {
  const source = (await readFile(src)).toString()
  const nextSource = await transformer(source)
  await writeFile(destination, nextSource)
  return nextSource
}

function parseTemplate(tpl: string, options: Record<string, any>) {
  const oldValue = templateSettings.interpolate
  templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const compiled = template(tpl)
  return compiled(options)
}

async function run() {
  if (!example.name) {
    throw new Error('Missing package name')
  }
  const path = join(process.cwd(), '../../src')
  try {
    await mkdir(join(path, 'examples', example.module))
  } catch (error) {}
  await mkdir(join(path, 'examples', example.module, example.name))
  await mkdir(join(path, 'examples', example.module, example.name, 'src'))
  await Promise.all(
    [
      'package.json',
      'README.md',
      'src/index.ts'
    ].map(async file => {
      copyAndTransformFile(
        join(process.cwd(), 'templates/example', file),
        join(path, 'examples', example.module, example.name, file),
        async source => parseTemplate(source, { example })
      )
    })
  )
  await promisify(exec)('yarn')
}

run().catch(error => {
  console.log(error)
  process.exit(8)
})
