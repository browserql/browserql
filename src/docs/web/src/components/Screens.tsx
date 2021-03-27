import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { print } from 'graphql'

import Code from './Code'
import Iframe from './Iframe'

enum ScreenLanguage {
  grapqhl = 'graphql',
  json = 'json',
  typescript = 'typescript',
  react = 'react',
}

interface Screen {
  language: ScreenLanguage
  name: string
  source: string
  eval?: string
  description?: string
  headsUp?: string
  title?: string
}

interface Props {
  screens: Screen[]
}

export default function Screens({ screens }: Props) {
  const [tab, setTab] = useState(screens.length - 1)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue)
  }
  const selectedScreen = screens[tab]
  return (
    <div style={{ marginTop: 12 }}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {screens.map((screen) => (
          <Tab
            label={screen.eval ? 'Result' : screen.title || screen.name}
            key={`${screen.name}-${screen.eval ? 'eval' : ''}`}
            color={screen.eval ? 'secondary' : 'default'}
            wrapped
          />
        ))}
      </Tabs>
      {selectedScreen.description && (
        <Typography
          style={{
            padding: 12,
            paddingLeft: 24,
            paddingRight: 24,
            borderLeft: '5px solid #ccc',
            borderRight: '5px solid #ccc',
            backgroundColor: '#efefef',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <HelpOutlineIcon />
          {selectedScreen.description}
        </Typography>
      )}
      {selectedScreen.headsUp && (
        <Typography
          style={{
            padding: 12,
            paddingLeft: 24,
            paddingRight: 24,
            borderLeft: '5px solid #900',
            borderRight: '5px solid #900',
            backgroundColor: '#ffecea',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            color: '#900',
          }}
        >
          <ErrorOutlineIcon />
          {selectedScreen.headsUp}
        </Typography>
      )}
      <div style={{ paddingBottom: 12 }}>
        {['json', 'typescript'].includes(selectedScreen.language) && (
          <Code
            language={(selectedScreen.language as unknown) as string}
            value={
              selectedScreen.language === ScreenLanguage.json
                ? JSON.stringify(selectedScreen.source, null, 2)
                : selectedScreen.source
            }
          />
        )}
        {selectedScreen.language === 'graphql' &&
          typeof selectedScreen.source === 'string' && (
            <Code language="graphql" value={selectedScreen.source} />
          )}
        {selectedScreen.language === 'graphql' &&
          typeof selectedScreen.source !== 'string' && (
            <>
              <Code
                language="graphql"
                value={print(
                  // @ts-ignore
                  selectedScreen.source
                )}
              />
              <Code
                language="json"
                value={JSON.stringify(selectedScreen.source, null, 2)}
              />
            </>
          )}
        {selectedScreen.language === 'react' && <Iframe />}
      </div>
    </div>
  )
}
