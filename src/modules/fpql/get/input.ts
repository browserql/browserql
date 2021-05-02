import { DocumentNode } from 'graphql'
import getInputs from './inputs'
import getName from './name'

export default function getInput(name: string) {
  return (schema: DocumentNode) =>
    getInputs(schema).find((input) => getName(input) === name)
}