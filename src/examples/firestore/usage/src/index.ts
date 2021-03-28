import connect from '@browserql/client'
import connectFirestore from '@browserql/firestore/connect'

import schema from './schema.graphql'
import db from './db'

export default async function() {
  const client = connect(connectFirestore(db, schema))
  return 'Hello world!'
}
