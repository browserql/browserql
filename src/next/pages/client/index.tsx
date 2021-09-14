import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/README/client')
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
