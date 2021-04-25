import result from './index'

it('renders correctly', async () => {
  const r = await result()
  delete r.data.firestoreAddTodo.id
  expect(r).toMatchSnapshot()
})
