import type { DocumentNode, ObjectTypeDefinitionNode, ObjectTypeExtensionNode } from 'graphql';
interface Options {
    includesExtended?: boolean;
}
export default function getType(name: string, options?: Options): (document: DocumentNode) => ObjectTypeDefinitionNode | ObjectTypeExtensionNode | undefined;
export {};
//# sourceMappingURL=type.d.ts.map