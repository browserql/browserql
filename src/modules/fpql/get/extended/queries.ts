import type { DefinitionNode, DocumentNode } from 'graphql';
import getName from '../name';

export default function getExtendedQueries(
  document: DocumentNode
): DefinitionNode[] {
  const { definitions } = document;
  return definitions.filter(
    (def) => def.kind === 'ObjectTypeExtension' && getName(def) === 'Query'
  );
}
