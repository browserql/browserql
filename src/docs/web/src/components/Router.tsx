import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { PATH } from '../paths'
import Example from './Example'
import Home from './Home'

export default function Router() {
  return (
    <Switch>
      <Route path={PATH.HOME} component={Home} exact />
      <Route path={PATH.EXAMPLE} component={Example} />
    </Switch>
  )
}
