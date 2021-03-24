import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import {template, templateSettings } from 'lodash'
import { exec } from 'child_process'
import { promisify } from 'util'

const [,, pkgName, type = 'module'] = process.argv

const pkg = {
  name: pkgName,
  type
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
  if (!pkg.name) {
    throw new Error('Missing package name')
  }
  const path = join(process.cwd(), '../../src')
  await mkdir(join(path, 'modules', pkg.name))
  await mkdir(join(path, 'modules', pkg.name, 'src'))
  await Promise.all([
    copyAndTransformFile(
      join(process.cwd(), 'templates/module', 'package.json'),
      join(path, 'modules', pkg.name, 'package.json'),
      async source => parseTemplate(source, { package: pkg })
    ),
    copyAndTransformFile(
      join(process.cwd(), 'templates/module', 'tsconfig.json'),
      join(path, 'modules', pkg.name, 'tsconfig.json'),
      async source => parseTemplate(source, { package: pkg })
    ),
    copyAndTransformFile(
      join(process.cwd(), 'templates/module', 'src/index.ts'),
      join(path, 'modules', pkg.name, 'src/index.ts'),
      async source => parseTemplate(source, { package: pkg })
    ),
  ])
  await promisify(exec)('yarn')
}

run().catch(error => {
  console.log(error)
  process.exit(8)
})
