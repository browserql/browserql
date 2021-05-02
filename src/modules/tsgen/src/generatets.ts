import type { DocumentNode } from 'graphql'
import {
  getInputs,
  getMutations,
  getQueries,
  getTypes,
  getEnumerations,
  getExecutableOperations
} from '@browserql/fpql'

import { TSGeneratorOptions } from './types'
import generateType from './generateType'
import generateTSDeclaration from './generateTSDeclaration'
import generateField from './generateField'
import generateEnumeration from './generateEnumeration'
import generateOperation from './generateOperation'

export default function generatets(
  schema: DocumentNode,
  options: TSGeneratorOptions = {}
) {
  const types = getTypes(schema)
    .map((type) => generateType(type, schema, options))
    .join('\n')
  const queries = getQueries(schema)
  const executableOperations = getExecutableOperations(schema).map(operation => generateOperation(operation, schema, options)).join('\n')
  const mutations = getMutations(schema)
  const inputs = getInputs(schema)
    .map((type) => generateType(type, schema, options))
    .join('\n')
  const enums = getEnumerations(schema).map((enumeration) =>
    generateEnumeration(enumeration, options)
  )
  return [
    types,
    inputs,
    enums,
    executableOperations,
    queries.length > 0 &&
      `
${generateTSDeclaration('Query', 'interface', options)} {
${queries.map(generateField(schema, options)).join('\n\n')}
}
`,
    mutations.length > 0 &&
      `
${generateTSDeclaration('Mutation', 'interface', options)} {
${mutations.map(generateField(schema, options)).join('\n\n')}
}
`,
  ]
    .filter(Boolean)
    .join('\n\n')
}
