import Typography from '@material-ui/core/Typography';
import React, { useCallback, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from './Nav';
import { IconButton } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

export default function Aside() {
  const [open, control] = useState(true);
  const toggle = useCallback(() => control(!open), [open]);

  const style = {
    width: open ? '300px' : '50px',
    transition: 'all 0.5s ease-out',
  };

  return (
    <Drawer variant='persistent'>
      <Toolbar />
      <Nav />
    </Drawer>
  );
}
