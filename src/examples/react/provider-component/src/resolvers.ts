export async function getUsers() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    { id: 1, login: 'abc' },
    { id: 2, login: 'def' },
    { id: 3, login: 'ghi' },
  ]
}
