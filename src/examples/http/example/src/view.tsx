import React from 'react';
import { BrowserqlProvider } from '@browserql/react';
import { connectHttp } from '@browserql/http';
import { parse } from 'graphql';

import schema from './schema.graphql';
import Todos from './Todos';

export default async function () {
  return (
    <BrowserqlProvider schema={parse(schema)} extensions={[connectHttp()]}>
      <Todos />
    </BrowserqlProvider>
  );
}
