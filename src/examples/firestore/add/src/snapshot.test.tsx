import result from './index'

it('renders correctly', async () => {
  const r = await result()
  delete r.data.firestoreAdd_Todo.id
  expect(r).toMatchSnapshot()
})
