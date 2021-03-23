import { createContext } from 'react'
import type { BrowserqlClient } from '@browserql/types'

const BrowserqlContext = createContext<BrowserqlClient>(
  // @ts-ignore
  {}
)

export default BrowserqlContext
