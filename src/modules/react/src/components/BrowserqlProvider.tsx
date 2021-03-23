import React from 'react';
import type { DocumentNode } from 'graphql';
import type { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';

import BrowserqlContext from '../contexts/BrowserqlContext';
import {
  BrowserqlClientProperty,
  BrowserqlClientPropertyFactory,
} from '@browserql/types';
import connect from '@browserql/client';

export interface BrowserqlProviderProps {
  client?: any;
  schema?: DocumentNode;
  extensions?: Array<BrowserqlClientProperty | BrowserqlClientPropertyFactory>;
  queries?: BrowserqlClientProperty['queries'];
  mutations?: BrowserqlClientProperty['mutations'];
  directives?: BrowserqlClientProperty['directives'];
  scalars?: BrowserqlClientProperty['scalars'];
  renderError?: ReactElement | ((props: { error: Error }) => ReactElement);
}

function BrowserqlProviderError({ error }: { error: Error }) {
  return (
    <div>
      <h1>BrowerqlProvider Error</h1>
      <pre>{error?.stack}</pre>
    </div>
  );
}

export default function BrowserqlProvider(
  props: React.PropsWithChildren<BrowserqlProviderProps>
) {
  let { client, renderError } = props;
  try {
    if (!client) {
      const connectors: Array<
        BrowserqlClientProperty | BrowserqlClientPropertyFactory
      > = [];
      if (props.schema) {
        connectors.push({ schema: props.schema });
      }
      if (props.extensions) {
        connectors.push(...props.extensions);
      }
      client = connect(...connectors, {
        queries: props.queries,
        mutations: props.mutations,
        directives: props.directives,
        scalars: props.scalars,
      });
    }
  } catch (error) {
    if (renderError) {
      if (typeof renderError === 'function') {
        return renderError({ error });
      }
      return renderError;
    }
    return <BrowserqlProviderError error={error} />;
  }

  return (
    <ApolloProvider client={client.apollo}>
      <BrowserqlContext.Provider value={client}>
        {props.children}
      </BrowserqlContext.Provider>
    </ApolloProvider>
  );
}
