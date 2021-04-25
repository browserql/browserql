import { readdir } from 'fs/promises'
import { join, resolve } from 'path'

async function run() {
  const path = resolve(process.cwd(), '../..')
  const modules = await readdir(join(path, 'src/examples'))
  const examples = await Promise.all(modules.map(async mod => {
    
  }))
}

run()