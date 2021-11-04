interface Variables {
  to: string
}

export async function sayHello({ to }: Variables) {
  return `Hello, ${to}!`
}
