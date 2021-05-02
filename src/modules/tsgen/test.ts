import gents from './src/index'
import { parse } from 'graphql'

const doc = parse(`
type Query {
  foo(id: ID!): ID!
}

query GetAll($id: ID = 100) {
  foo(id: $ID)
  bar(id: $ID)
}
`)

console.log(gents(doc))

export const foo = 1
