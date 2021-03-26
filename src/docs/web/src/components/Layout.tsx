import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import React, { ComponentType, useEffect, useState } from 'react';
import Embed from './Embed';
import Navigation from './Navigation';
import Router from './Router';

export default function Layout() {
  if (/^\/embed/.test(location.pathname)) {
    const [, , moduleName, exampleName] = location.pathname.split(/\//);
    console.log({ moduleName, exampleName });
    return <Embed module={moduleName} example={exampleName} />;
  }
  return (
    <div>
      <CssBaseline />
      <Navigation />
      <Paper
        style={{
          background: 'white',
          padding: 12,
          flex: 1,
          maxWidth: 1111,
          margin: 'auto',
          marginTop: 90,
        }}
        elevation={3}
      >
        <Router />
      </Paper>
    </div>
  );
}
