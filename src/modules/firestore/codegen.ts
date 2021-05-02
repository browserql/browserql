import {
  ASTNode,
  GraphQLNamedType,
  GraphQLSchema,
  isSpecifiedDirective,
  isSpecifiedScalarType,
  parse,
  print,
} from 'graphql'
import generateSchema from './generate/schema';

function printSchemaWithDirectives(schema: GraphQLSchema) {
  const str = Object
    .keys(schema.getTypeMap())
    .filter(k => !k.match(/^__/))
    .reduce((accum, name) => {
      const type = schema.getType(name);
      return !isSpecifiedScalarType(type as GraphQLNamedType)
        ? accum += `${print((type as GraphQLNamedType).astNode as ASTNode)}\n`
        : accum;
    }, '');

  return schema
    .getDirectives()
    .reduce((accum, d) => {
      return !isSpecifiedDirective(d)
        ? accum += `${print((d.astNode as ASTNode))}\n`
        : accum;
    }, str + `${print(schema.astNode as ASTNode)}\n`);
}

export default {
  plugin: (schema:GraphQLSchema) => {
    const doc = parse(printSchemaWithDirectives(schema))
    const x = generateSchema(doc)
    return print(x)
  },
};
