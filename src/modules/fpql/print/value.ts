import type { ArgumentNode } from 'graphql'
import getName from '../get/name'

export default function printValue(value: ArgumentNode['value']): any {
  switch (value.kind) {
    case 'IntValue':
    case 'FloatValue':
      return Number(value.value)
    case 'StringValue':
    case 'EnumValue':
      return value.value.toString()
    case 'BooleanValue':
      return value.value
    case 'ListValue':
      return value.values.map(printValue)
    case 'ObjectValue':
      return value.fields.reduce(
        (object, field) => ({
          ...object,
          [getName(field)]: printValue(field.value),
        }),
        {}
      )
    default:
      return null
  }
}
