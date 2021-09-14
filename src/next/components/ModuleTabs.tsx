import { Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  links: {
    path: string
    title: string
  }[]
}

export default function ModuleTabs({ links }: Props) {
  const [tab, setTab] = useState(0)

  const onChange = (nextTab: number) => {
    setTab(nextTab)
  }

  return (
    <Tabs
      value={tab}
      indicatorColor="secondary"
      onChange={(e, tab) => onChange(tab)}
    >
      {links.map((link) => (
        <Tab
          key={link.path}
          label={<Link href={link.path}>{link.title}</Link>}
        />
      ))}
    </Tabs>
  )
}
