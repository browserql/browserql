import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { find, findIndex, compact } from 'lodash'
import Render from './Render'
import { AppContext } from 'next/app'

interface Afile {
  files: {
    contents: string
    name: string
  }[]
}

export async function getStaticProps(ctx: AppContext) {
  // const res = await fetch('http://localhost:3000/api/files/state/example')
  console.log('ctx')
  console.log(ctx)
  const res = await fetch(`/api/files/`)
  const data: {
    files: {
      contents: string
      name: string
    }[]
  } = await res.json()

  console.log(data)

  // const all = await Promise.all(
  //   data.files.map(async (file) => {
  //     const buff = Buffer.from(file.contents, 'base64')
  //     const mdxSource = await serialize(`\`\`\`${buff}\`\`\``)
  //     return {
  //       name: file.name,
  //       contents: mdxSource,
  //     }
  //   })
  // )

  return {
    props: data,
  }
}

interface Props {
  files: {
    name: string
    contents: string
  }[]
}

const components = {}

export default function ClientExample({ files }: Props) {
  const nextFiles: Props['files'] = [
    'schema.graphql',
    'operations.graphql',
    'Provider.tsx',
    'Counter.tsx',
  ].map(
    (name) =>
      find(files, { name }) as {
        name: string
        contents: string
      }
  )

  const [tab, setTab] = useState(0)
  const renderIndex = findIndex(nextFiles, ({ name }) => name === 'Render.tsx')

  const { contents, name } = nextFiles[tab]
  const arrached =
    typeof window === 'undefined'
      ? contents
      : decodeURIComponent(escape(window.atob(contents)))
  const ext =
    tab !== renderIndex
      ? /\.graphql$/.test(name)
        ? 'graphql'
        : /\.ts$/.test(name)
        ? 'typescript'
        : 'javascript'
      : 'jsx'

  console.log({ nextFiles })

  return (
    <div>
      <div>
        <Tabs
          value={tab}
          indicatorColor="primary"
          onChange={(event, nextTab) => setTab(nextTab)}
        >
          {nextFiles
            // .filter(({ name }) => name !== 'Render.tsx')
            .map((file) => (
              <Tab label={file.name} key={file.name} />
            ))}
        </Tabs>
      </div>

      <div style={{ padding: 16, display: 'flex' }}>
        <div style={{ width: '40vw' }}>
          {tab !== renderIndex && (
            <ReactMarkdown>{`\`\`\`${ext}\n${arrached}\n\`\`\``}</ReactMarkdown>
          )}
        </div>

        <div
          style={{
            flex: 1,
            border: '6px solid #999',
            background: '#222',
            borderRadius: 12,
            alignSelf: 'stretch',
            height: 'calc(100vh - 200px)',
            padding: 16,
          }}
        >
          {typeof window !== 'undefined' && (
            <Render
              files={compact(
                nextFiles.map((file) => {
                  try {
                    return {
                      name: file.name,
                      contents: decodeURIComponent(
                        escape(window.atob(file.contents))
                      ),
                    }
                  } catch (error) {
                    return null
                  }
                })
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}
