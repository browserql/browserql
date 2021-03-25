import connect from '@browserql/client'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'graphql'
import { whatTimeIsIt } from './resolvers'

const schemaSource = readFileSync(join(__dirname, 'schema.graphql'))
const schema = parse(schemaSource.toString())

export default connect(schema, { queries: { whatTimeIsIt }})
