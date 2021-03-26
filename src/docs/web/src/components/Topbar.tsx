import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import HideOnScroll from './HideOnScroll';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

interface Props {
  onClickMenu(): void;
}

export default function Topbar({ onClickMenu }: Props) {
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>browserql</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
