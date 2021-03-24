import { ObjectTypeDefinitionNode, ObjectTypeExtensionNode, InputObjectTypeDefinitionNode, FieldDefinitionNode, InputValueDefinitionNode } from 'graphql';
export default function getFields(type: ObjectTypeDefinitionNode | ObjectTypeExtensionNode | InputObjectTypeDefinitionNode): readonly (FieldDefinitionNode | InputValueDefinitionNode)[];
//# sourceMappingURL=fields.d.ts.map