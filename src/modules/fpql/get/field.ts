import type {
  InputObjectTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from 'graphql'
import getFields from './fields'
import getName from './name'

export default function getField(name: string) {
  return (
    type:
      | ObjectTypeDefinitionNode
      | ObjectTypeExtensionNode
      | InputObjectTypeDefinitionNode
  ) => getFields(type).find((field) => getName(field) === name)
}