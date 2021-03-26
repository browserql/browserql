import result from './query';

it('renders correctly', async () => {
  const r = await result();
  expect(r).toMatchSnapshot();
});
