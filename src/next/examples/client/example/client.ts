import connect from '@browserql/client'

import { sayHello } from './resolvers'
import schema from './schema.graphql'

export default connect(schema, { queries: { sayHello } })
