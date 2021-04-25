import { mkdir } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { copyOver, stepper } from '../utils'
import { buildExamplesList } from './buildExamplesList'

export async function addExample({ module: mod, example }: any) {
  const path = join(process.cwd(), '../../../src')
  const source = join(path, 'utils/templates/example')
  const destination = join(path, 'examples', mod, example)

  await stepper({})(
    ['Create module directory if not exists', () => mkdir(join(path, 'examples', mod)), { ignoreError: true }],
    ['Create example directory',              () => mkdir(destination)],
    ['Copy and parse template files',         () => copyOver(source, destination, { example: { module: mod, name: example} })],
    ['Refresh yarn',                          () => promisify(exec)('yarn')],
    // ['Build example',                         () => buildExample({ module: mod, example })],
    ['Rebuild examples list',                 buildExamplesList]
  )

  return true
}
