import React from 'react';
import { BrowserqlProvider } from '@browserql/react';

import schema from './schema.graphql';
import Users from './Users';
import { getUsers } from './resolvers';

export default function View() {
  return (
    <BrowserqlProvider schema={schema} queries={{ getUsers }}>
      <Users />
    </BrowserqlProvider>
  );
}
