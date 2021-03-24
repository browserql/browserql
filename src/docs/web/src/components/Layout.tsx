import Typography from '@material-ui/core/Typography';
import React, { useCallback, useState } from 'react';
import Aside from './Aside';
import Nav from './Nav';
import Router from './Router';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function V1() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexWrap: 'wrap',
      }}
    >
      <aside
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div style={{ padding: 16, textAlign: 'center' }}>
          <Typography variant='h5'>browserql</Typography>
        </div>
        <Nav />
      </aside>
      <main
        style={{
          flex: 1,
          padding: 24,
          marginRight: 12,
          border: '3px solid #9799C4',
          borderBottom: 'none',
          borderRadius: '6px 6px 0 0',
          marginTop: 24,
          backgroundColor: 'white',
          boxShadow: '5px 5px 150px 50px rgba(171, 85, 70, 0.25)',
          maxWidth: 1200,
          minWidth: 995,
          height: 'calc(100vh - 50px)',
          overflow: 'auto',
        }}
      >
        <Router />
      </main>
    </div>
  );
}

export default function Layout() {
  const [on, set] = useState(false);
  const toggle = useCallback(() => set(!on), [on]);
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <IconButton onClick={toggle} style={{ position: 'fixed', top: 0 }}>
        <MenuIcon />
      </IconButton>
      <aside
        style={{
          height: '100vh',
          overflow: 'auto',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            backgroundColor: `rgba(225, 225, 225, ${on ? 0 : 1})`,
            height: 50,
            transition: 'all 0.5s ease-out',
          }}
        ></div>
      </aside>
      <main
        style={{
          flex: 1,
          padding: 24,
          // marginRight: 12,
          border: '3px solid #9799C4',
          borderBottom: 'none',
          borderRadius: '6px 6px 0 0',
          marginTop: 50,
          backgroundColor: 'white',
          boxShadow: '5px 5px 150px 50px rgba(171, 85, 70, 0.25)',
          maxWidth: 1200,
          // minWidth: 995,
          height: 'calc(100vh - 75px)',
          overflow: 'auto',
        }}
      >
        <Router />
      </main>
    </div>
  );
}
