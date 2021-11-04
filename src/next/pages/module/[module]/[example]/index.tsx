import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { compact, find, findIndex } from 'lodash'
import { AppContext } from 'next/app'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { modules } from '../../../components/ModulesTabs'

interface Afile {
  files: {
    contents: string
    name: string
  }[]
}

export async function getStaticPaths() {
  return {
    paths: modules.map((mod) => ({
      params: {
        module: mod,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(ctx: AppContext) {
  console.log(ctx)
  const res = await fetch('http://localhost:3000/api/files/client/example')
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
    'resolvers.ts',
    'client.ts',
    'query.ts',
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
