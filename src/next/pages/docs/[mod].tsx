import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Doc() {
  const router = useRouter()
  const { mod } = router.query

  return (
    <div>
      <Link href={`/docs/${mod}/examples/example`}>Example</Link>
    </div>
  )
}
