import { Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import Link from 'next/link'

export default function ModulesTabs() {
  const [tab, setTab] = useState(0)

  const onChange = (nextTab: number) => {
    setTab(nextTab)
  }

  return (
    <Tabs
      value={tab}
      indicatorColor="primary"
      onChange={(e, tab) => onChange(tab)}
    >
      <Tab label={<Link href="/client">client</Link>} />
      <Tab label={<Link href="/state">state</Link>} />
    </Tabs>
  )
}
