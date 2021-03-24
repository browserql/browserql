import Typography from '@material-ui/core/Typography';
import React from 'react';
import Nav from './Nav';
import Router from './Router';

export default function Layout() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
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
          height: 'calc(100vh - 75px)',
          overflow: 'auto',
        }}
      >
        <Router />
      </main>
    </div>
  );
}
