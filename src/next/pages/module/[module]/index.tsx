import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { AppContext } from 'next/app'
import { modules } from '../../../components/ModulesTabs'
import { makeApiPath } from '../../../paths'

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

export async function getStaticProps(ctx: any) {
  const res = await fetch(makeApiPath.getModuleReadme(ctx.params))
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  const mdxSource = await serialize(data.README)

  return {
    props: {
      README: mdxSource,
    },
  }
}

interface Props {
  README: MDXRemoteSerializeResult
}

const components = {}

export default function Client({ README }: Props) {
  return (
    <div>
      <MDXRemote {...README} components={components} />
    </div>
  )
}
