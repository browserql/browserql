import type { DirectiveNode, FieldDefinitionNode } from 'graphql'
import getArguments from './arguments'
import getName from './name'

export default function getArgument(name: string) {
  return (field: FieldDefinitionNode | DirectiveNode) => {
    // @ts-ignore
    return getArguments(field).find((arg) => getName(arg) === name)
  }
}
