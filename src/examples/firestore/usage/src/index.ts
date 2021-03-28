import connect from '@browserql/client'
import connectFirestore from '@browserql/firestore/connect'

import schema from './schema.graphql'
import query from './query.graphql'
import db from './db'

export default async function() {
  const client = connect(schema, connectFirestore(db, schema))
  return client.apollo.query({ query })
}
