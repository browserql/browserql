import { mkdir } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { copyOver } from './utils'

const [,, exampleModule, exampleName] = process.argv

const example = {
  name: exampleName,
  module: exampleModule
}

async function run() {
  if (!example.name) {
    throw new Error('Missing package name')
  }
  const path = join(process.cwd(), '../../src')
  try {
    await mkdir(join(path, 'examples', example.module))
  } catch (error) {}
  const source = join(path, 'utils/templates/example')
  const destination = join(path, 'examples', example.module, example.name)
  await mkdir(destination)
  await copyOver(source, destination, { example })
  await promisify(exec)('yarn')
}

run().catch(error => {
  console.log(error)
  process.exit(8)
})
