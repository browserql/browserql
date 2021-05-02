import { DocumentNode } from 'graphql'
import getEnumerations from './enumerations'
import getName from './name'


export default function getEnumeration(name: string) {
  return (schema: DocumentNode) =>
    getEnumerations(schema).find((enumeration) => getName(enumeration) === name)
}