import { Typography } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import React, { ComponentType, useEffect, useState } from 'react'
import Embed from './Embed'
import Nav from './Nav'
import Navigation from './Navigation'
import Router from './Router'
import Topbar from './Topbar'

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
      <CssBaseline />
      <header style={{ width: '100vw' }}>
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
      <aside style={{ marginBottom: 36 }}>
        <Nav toggle={() => {}} />
      </aside>
      <main style={{ flex: 1 }}>
        <Paper
          style={{
            background: 'white',
            padding: 12,
            flex: 1,
            maxWidth: 1111,
            margin: 'auto',
            marginTop: -36,
          }}
          elevation={3}
        >
          <Router />
        </Paper>
      </main>
    </div>
  )
}
