import type { ArgumentNode } from 'graphql'
import printValue from '../print/value'

export default function getValue(arg: ArgumentNode): any {
  return printValue(arg.value)
}
