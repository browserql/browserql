import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import React, { useCallback, useState } from 'react';
import Nav from './Nav';
import Topbar from './Topbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: 60,
    },
  })
);

export default function Navigation() {
  const classes = useStyles();
  const [open, control] = useState(false);
  const toggle = useCallback(() => control(!open), [open]);

  return (
    <>
      <header>
        <Topbar onClickMenu={toggle} />
      </header>
      <aside>
        <Drawer
          open={open}
          onClose={toggle}
          className={classes.root}
          PaperProps={{
            style: {
              top: 64,
            },
          }}
          ModalProps={{
            style: {
              top: 64,
            },
            BackdropProps: {
              style: {
                top: 64,
              },
            },
          }}
        >
          <Nav />
        </Drawer>
      </aside>
    </>
  );
}
