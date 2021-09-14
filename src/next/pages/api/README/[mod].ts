// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFile } from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

type Query = {
  mod: string
}

type Data = {
  README: string
}

export default async function handler(
  req: NextApiRequest & { query: Query },
  res: NextApiResponse<Data>
) {
  const { mod } = req.query

  const filePath = resolve(
    process.cwd(),
    '../..',
    'src/modules',
    mod,
    'README.md'
  )

  const README = (await readFile(filePath)).toString()

  res.status(200).json({ README })
}
