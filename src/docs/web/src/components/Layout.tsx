import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Embed from './Embed'
import Footer from './Footer'
import Nav from './Nav'
import Router from './Router'

export default function Layout() {
  if (/^\/embed/.test(location.pathname)) {
    const [, , moduleName, exampleName] = location.pathname.split(/\//)
    console.log({ moduleName, exampleName })
    return <Embed module={moduleName} example={exampleName} />
  }
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <header style={{ width: '100vw', minWidth: '100vw' }}>
        <Paper
          elevation={3}
          style={{
            height: 96,
            backgroundColor: 'lightslategrey',
            display: 'flex',
            placeContent: 'end space-between',
            borderRadius: 0,
          }}
        >
          <Typography style={{ color: 'white' }}></Typography>
        </Paper>
      </header>

      <aside
        style={{
          marginBottom: 36,
          maxHeight: 'calc(100vh - 96px)',
          overflow: 'auto',
        }}
      >
        <Nav toggle={() => {}} />
      </aside>

      <main style={{ flex: 1, maxWidth: '100vw', marginBottom: 36 }}>
        <Paper
          style={{
            background: 'white',
            padding: 12,
            flex: 1,
            maxWidth: 1111,
            margin: 'auto',
            marginTop: -36,
            // transform: 'rotate(-3deg)',
            // transformOrigin: 'bottom left',
          }}
          elevation={3}
        >
          <Router />
        </Paper>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
