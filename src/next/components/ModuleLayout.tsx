import { ReactNode } from 'react'
import ModuleTabs from './ModuleTabs'

interface Props {
  children: ReactNode
}

export default function ModuleLayout({ children }: Props) {
  return (
    <>
      <ModuleTabs
        links={[
          {
            title: 'Example',
            path: '/client/example',
          },
        ]}
      />
      <div>{children}</div>
    </>
  )
}
