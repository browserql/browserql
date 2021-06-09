import { print, DocumentNode, parse } from 'graphql'

import { transformTypeToInput } from '@browserql/inputs'
import {
  getDirective,
  getFields,
  getKind,
  getName,
  getTypes,
  parseKind,
  getType,
} from '@browserql/fpql'

import staticSchema from '../static-schema'
import dynamicSchema from '../dynamic-schema'
import { FirestoreWhereInput } from '../types'

export default function generateSchema(schema: DocumentNode) {
  const types = getTypes(schema as DocumentNode)
  const models = types.filter(getDirective('firestore'))
  const defs: string[] = [print(staticSchema)]
  models.forEach((model) => {
    const modelName = getName(model)

    defs.push(
      print(dynamicSchema).replace(/TYPE/g, modelName),
      print(transformTypeToInput(model, schema as DocumentNode)).replace(
        `input ${modelName}Input `,
        `input ${modelName}FirestoreInput `
      )
    )

    const fields = getFields(model)

    if (!fields.find((field) => getName(field) === 'id')) {
      defs.push(`extend type ${modelName} { id: ID! }`)
    }

    defs.push(`
        input FirestoreRef_${modelName} {
          endAfter: ID
          endAt: ID
          limit: Int
          orderBy: [FirestoreOrderBy!]
          startAfter: ID
          startAt: ID
          where: FirestoreWhere_${modelName}
        }

        input FirestoreWhere_${modelName} {
          ${fields.map(
            (field) =>
              `${getName(field)}: FirestoreWhere_${modelName}_${getName(field)}`
          )}
        }
      `)

    defs.push(
      ...fields.map((field) => {
        const { type: kind, depth } = parseKind(getKind(field))

        let trueKind = kind

        const obj = getType(kind)(schema)

        if (obj) {
          trueKind = `${kind}Input`
        }

        const attrs: Partial<Record<keyof FirestoreWhereInput, string>> = {
          equals: trueKind,
          equalsNot: trueKind,
          in: `[${trueKind}]`,
          notIn: `[${trueKind}]`,
          greaterThan: 'Float',
          greaterThanOrEqual: 'Float',
          lessThan: 'Float',
          lessThanOrEqual: 'Float',
        }

        if (depth) {
          attrs.arrayContains = trueKind
          attrs.arrayContainsAny = `[${trueKind}]`
        }

        return `
          input FirestoreWhere_${modelName}_${getName(field)} {
            ${Object.keys(attrs)
              .map((attr) => `${attr}: ${attrs[attr as keyof typeof attrs]}`)
              .join(`\n${' '.repeat(12)}`)}
          }
        `
      })
    )
  })
  const finalSchema = parse([...defs].join('\n'))
  return finalSchema
}
