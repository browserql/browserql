import { DocumentNode } from 'graphql'
import getMutations from './mutations'
import getName from './name'

export default function getMutation(name: string) {
  return (document: DocumentNode) => getMutations(document)
    .find(mutation => getName(mutation) === name)
}