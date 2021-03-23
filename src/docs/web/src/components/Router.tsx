import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATH } from '../paths';
import Example from './Example';

export default function Router() {
  return (
    <Switch>
      <Route path={PATH.EXAMPLE} component={Example} />
    </Switch>
  );
}
