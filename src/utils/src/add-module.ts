import { mkdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { copyOver } from './utils'

const [,, pkgName, type = 'module'] = process.argv

const pkg = {
  name: pkgName,
  type
}

async function run() {
  if (!pkg.name) {
    throw new Error('Missing package name')
  }
  const path = resolve(process.cwd(), '../../src')
  const source = join(path, 'utils/templates/module')
  const destination = join(path, 'modules', pkg.name)
  await mkdir(destination)
  await copyOver(source, destination, { package: pkg })
  await promisify(exec)('yarn')
}

run().catch(error => {
  console.log(error)
  process.exit(8)
})
