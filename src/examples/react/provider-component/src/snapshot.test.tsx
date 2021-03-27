import React from 'react';
import renderer from 'react-test-renderer';
import View from './view';

const originalError = console.error;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }

    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

it('renders correctly', () => {
  let tree;
  renderer.act(() => {
    tree = renderer.create(<View />).toJSON();
  });
  expect(tree).toMatchSnapshot();
});
