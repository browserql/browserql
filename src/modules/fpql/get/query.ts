import type { DocumentNode } from 'graphql'
import getName from './name'
import getQueries from './queries'

export default function getQuery(name: string) {
  return (document: DocumentNode) => getQueries(document)
    .find(query => getName(query) === name)
}