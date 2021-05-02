import { DocumentNode } from 'graphql'
import firestore from 'firebase'

import generateSchema from './generate/schema'
import generateResolvers from './generate/resolvers'


export default function generate(schema: DocumentNode, db: firestore.firestore.Firestore) {
  const finalSchema = generateSchema(schema)
  const resolvers = generateResolvers(schema, db)

  return {
    schema: finalSchema,
    ...resolvers
  }
}