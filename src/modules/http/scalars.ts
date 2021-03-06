// SOURCE: https://github.com/Urigo/graphql-scalars

import { GraphQLScalarType, Kind, ObjectValueNode, ValueNode } from 'graphql'

export function parseLiteral(ast: ValueNode, variables: any): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT:
      return parseObject(ast, variables)
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(n, variables))
    case Kind.NULL:
      return null
    case Kind.VARIABLE: {
      const name = ast.name.value
      return variables ? variables[name] : undefined
    }
  }
}

function ensureObject(value: any): value is object {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(
      `JSONObject cannot represent non-object value: ${value}`
    )
  }

  return value
}

function parseObject(ast: ObjectValueNode, variables: any): any {
  const value = Object.create(null)
  ast.fields.forEach((field) => {
    // eslint-disable-next-line no-use-before-define
    value[field.name.value] = parseLiteral(field.value, variables)
  })

  return value
}

export const HeadersJSONObject = /*#__PURE__*/ new GraphQLScalarType({
  name: 'HeadersJSONObject',
  description: 'HTTP Headers JSON Object',
  serialize: ensureObject,
  parseValue: ensureObject,
  // @ts-ignore
  parseLiteral: parseObject,
})

export const QueryJSONObject = /*#__PURE__*/ new GraphQLScalarType({
  name: 'QueryJSONObject',
  description: 'URL Query as a JSON Object',
  serialize: ensureObject,
  parseValue: ensureObject,
  // @ts-ignore
  parseLiteral: parseObject,
})
