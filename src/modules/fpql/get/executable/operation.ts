import { DocumentNode } from 'graphql'
import getName from '../name'
import getExecutableOperations from './operations'

export default function getExecutableOperation(name: string) {
  return (schema: DocumentNode) =>
    getExecutableOperations(schema).find(
      (operation) => getName(operation) === name
    )
}
