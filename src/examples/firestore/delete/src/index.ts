<<<<<<< HEAD
import connect from '@browserql/client'
import connectFirestore from '@browserql/firestore/connect'

import schema from './schema.graphql'
import mutation from './mutation.graphql'
import db from './db'


export default async function() {
  const client = connect(schema, connectFirestore(db))
  return client.apollo.mutate({ mutation, variables: { id: 'todo-1' } })
=======
export default async function() {
  return 'Hello world!'
>>>>>>> abf364ae224dca22359f7868fa98a090fd9af617
}