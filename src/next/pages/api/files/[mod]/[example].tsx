// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readdir, readFile } from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import { join, resolve } from 'path'

type Query = {
  mod: string
  example: string
}

type Data = {
  files: {
    name: string
    contents: string
  }[]
}

export default async function handler(
  req: NextApiRequest & { query: Query },
  res: NextApiResponse<Data>
) {
  const { mod, example } = req.query

  const base = resolve(process.cwd(), 'pages', mod, example)

  const files = await readdir(base)

  const examples = files.filter((file) => file !== 'index.tsx')

  const all = await Promise.all(
    examples.map(async (file) => {
      const source = (await readFile(join(base, file))).toString()
      const buff = Buffer.from(source, 'utf-8')
      const contents = buff.toString('base64')

      return {
        name: file,
        contents,
      }
    })
  )

  res.status(200).json({ files: all })
}
