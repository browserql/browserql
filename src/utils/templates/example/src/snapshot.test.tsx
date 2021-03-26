import result from './index';

it('renders correctly', async () => {
  const r = await result();
  expect(r).toMatchSnapshot();
});
