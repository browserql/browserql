import Typography from '@material-ui/core/Typography';
import React, { useCallback, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from './Nav';
import { IconButton } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';

export default function Aside() {
  const [on, set] = useState(false);
  const toggle = useCallback(() => set(!on), [on]);

  const style = {
    width: on ? '300px' : '50px',
    transition: 'all 0.5s ease-out',
  };

  return (
    <div style={style}>
      <div
        style={{
          backgroundColor: `rgba(225, 225, 225, ${on ? 0 : 1})`,
          height: 50,
          transition: 'all 0.5s ease-out',
        }}
      >
        <IconButton onClick={toggle} style={{ position: 'fixed', top: 0 }}>
          <MenuIcon />
        </IconButton>
      </div>
      {on && (
        <>
          <div style={{ padding: 16 }}>
            <Typography variant='h5'>browserql</Typography>
          </div>
          <Nav />
        </>
      )}
    </div>
  );
}
