import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Aside from './Aside';
import Nav from './Nav';
import Navigation from './Navigation';
import Router from './Router';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div>
      <CssBaseline />
      <Navigation />
      <Paper
        style={{ background: 'white', padding: 12, flex: 1, marginTop: 60 }}
        elevation={3}
      >
        <Router />
      </Paper>
    </div>
  );
}
