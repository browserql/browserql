import { ObjectTypeDefinitionNode } from "graphql";
import { getFields, parseKind, getKind } from '@browserql/fpql'

export default function buildFragment(type: ObjectTypeDefinitionNode) {
  const fields = getFields(type)
  const selections = fields.map(field => {
    const { type } = parseKind(getKind(field))
    
  })
}
