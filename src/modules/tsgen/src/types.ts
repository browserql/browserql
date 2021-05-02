import type { DocumentNode } from 'graphql';

export interface TSGeneratorOptions {
  useExport?: boolean
  useDeclare?: boolean
  typeSuffix?: string
  null?: NULL_STRATEGY | NULL_STRATEGY[]
  ID?: string
  schema?: DocumentNode
}

export enum NULL_STRATEGY {
  null = 'null',
  undefined = 'undefined',
  missing = 'missing',
}
