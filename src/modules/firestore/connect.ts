import firestore from 'firebase'
import { DocumentNode } from 'graphql'

import type { BrowserqlClientPropertyFactory } from '@browserql/types'

import generate from './generate'

export default function connect(
  db: firestore.firestore.Firestore,
): BrowserqlClientPropertyFactory {
  return ({ schema }) => generate(schema as DocumentNode, db)
}
