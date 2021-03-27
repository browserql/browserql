import result from './view';

it('renders correctly', async () => {
  const r = await result();
  expect(r).toMatchSnapshot();
});
