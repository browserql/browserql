import { Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import Link from 'next/link'
import { makePath } from '../paths'

export const modules = ['client', 'state', 'fpql', 'tsgen']

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
      {modules.map((mod) => (
        <Tab key={mod} label={<Link href={makePath.module(mod)}>{mod}</Link>} />
      ))}
    </Tabs>
  )
}
