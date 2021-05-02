import { print, DocumentNode, parse } from 'graphql'

import { transformTypeToInput } from '@browserql/inputs'
import { getDirective, getFields, getName, getTypes } from '@browserql/fpql'

import staticSchema from '../static-schema'
import dynamicSchema from '../dynamic-schema'


export default function generateSchema(schema: DocumentNode) {
  const types = getTypes(schema as DocumentNode)
    const models = types.filter(getDirective('firestore'))
    const defs: string[] = [
      print(staticSchema)
    ]
    models.forEach(model => {
      const modelName = getName(model)
      
      defs.push(
        print(dynamicSchema).replace(/TYPE/g, modelName),
        print(transformTypeToInput(model, schema as DocumentNode))
          .replace(`input ${modelName}Input `, `input ${modelName}FirestoreInput `),
      )
      
      const fields = getFields(model)
      if (!fields.find(field => getName(field) === 'id')) {
        defs.push(`extend type ${modelName} { id: ID! }`)
      }
    })
    const finalSchema = parse([...defs].join('\n'))
    return finalSchema
}