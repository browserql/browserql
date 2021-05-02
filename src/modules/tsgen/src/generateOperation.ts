import { DocumentNode, OperationDefinitionNode } from 'graphql';
import { getKind, getName, getQuery, parseKind } from '@browserql/fpql';
import generateField from './generateField';
import generateKind from './generateKind';
import { NULL_STRATEGY, TSGeneratorOptions } from './types';

export default function generateOperations(
  operation: OperationDefinitionNode,
  schema: DocumentNode,
  options: TSGeneratorOptions
) {
  const { null: nullStrategy = 'null' } = options
  const acceptsMissing =
    nullStrategy === 'missing' ||
    (Array.isArray(nullStrategy) &&
      nullStrategy.includes(NULL_STRATEGY.missing))
      
  const operationName = getName(operation)
  const { selectionSet: { selections }, variableDefinitions = [] } = operation
  
  const variables: string[] = variableDefinitions.map(def => {
    // @ts-ignore
    const variableName = getName(def.variable)
    // @ts-ignore
    return `${variableName}${acceptsMissing ? '?' : ''}: ${generateKind(parseKind(getKind(def)), schema, options)}`
  })

  const responses: any[] = selections.map(selection => {
    const selectionName = getName(selection)
    const query = getQuery(selectionName)(schema)
    if (!query) {
      return `${selectionName}${acceptsMissing ? '?' : ''}: any`
    }
    return `${selectionName}${acceptsMissing ? '?' : ''}: ${generateKind(parseKind(getKind(query)), schema, options)}`
  })

  return `${options.useExport ? 'export ' : ''}${options.useDeclare ? 'declare ' : ''}interface ${operation.operation}Operation {
    ${operationName}(
      variables: {
        ${variables.join(',\n        ')}
      }
    ): Promise<{
      ${responses.join(',\n      ')}
    }>
  }`
}