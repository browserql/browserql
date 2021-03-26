import { readdir } from 'fs/promises'
import { join, resolve } from 'path'

export async function runTests() {
  const path = resolve(process.cwd(), '../..')
  const modules = await readdir(join(path, 'examples'))
  await Promise.all(
    modules.map(async module => {
      const list = await readdir(join(path, 'examples', module))
      await Promise.all(
        list.map()
      ) 
    })
  )
  return true
}
