import { mkdir } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { copyOver } from '../utils'
import { buildExample } from './buildExample'
import { buildEmbedded } from './buildEmbedded'
import { buildExamplesList } from './buildExamplesList'

export async function addExample({ module: mod, example }: any) {
  console.log(123)
  const path = join(process.cwd(), '../../../src')
  try {
    await mkdir(join(path, 'examples', mod))
  } catch (error) {}
  const source = join(path, 'utils/templates/example')
  const destination = join(path, 'examples', mod, example)
  await mkdir(destination)
  await copyOver(source, destination, { example: { module: mod, name: example} })
  await promisify(exec)('yarn')
  await buildExample({ module: mod, example })
  // await buildEmbedded({ module: mod, example })
  await buildExamplesList()
  return true
}
