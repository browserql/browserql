import type { InputValueDefinitionNode } from 'graphql'
import printValue from '../../print/value'

export default function getDefaultValue(arg: InputValueDefinitionNode) {
  return typeof arg.defaultValue === 'undefined'
    ? undefined
    : printValue(arg.defaultValue)
}
