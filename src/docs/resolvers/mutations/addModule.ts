import { mkdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { copyOver } from '../utils'

export async function addModule({ module: mod }: { module: string }) {
  const path = resolve(process.cwd(), '../../../src')
  const source = join(path, 'utils/templates/module')
  const destination = join(path, 'modules', mod)
  await mkdir(destination)
  await copyOver(source, destination, { package: { name: mod } })
  await promisify(exec)('yarn')
  return true
}