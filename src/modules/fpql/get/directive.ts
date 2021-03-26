import type {
  FieldDefinitionNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from 'graphql'

import getDirectives from './directives'
import getName from './name'

export default function getDirective(name: string) {
  return (
    field:
      | FieldDefinitionNode
      | ObjectTypeDefinitionNode
      | ObjectTypeExtensionNode
  ) => getDirectives(field).find((directive) => getName(directive) === name)
}
