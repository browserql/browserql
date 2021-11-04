import connect from '@browserql/client'

import schema from './schema.graphql'
import { sayHello } from './resolvers'

export default connect(schema, { queries: { sayHello } })
