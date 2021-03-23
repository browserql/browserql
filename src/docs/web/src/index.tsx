import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserqlProvider } from '@browserql/react';
import Layout from './components/Layout';
import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import viewExample from './resolvers/queries/viewExample';

const queries = {
  viewExample,
};

const schema = readFileSync(
  '../graphql/src/generated/schema.graphql'
).toString();

render(
  <BrowserqlProvider schema={gql(schema)} queries={queries}>
    <Router>
      <Layout />
    </Router>
  </BrowserqlProvider>,
  document.getElementById('root')
);
