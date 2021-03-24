import type { InMemoryCache } from 'apollo-cache-inmemory'
import type { ApolloClient } from '@apollo/client'
import type { DocumentNode, GraphQLScalarType } from 'graphql'

interface SchemaDirectiveVisitorClass {

}

export type Context = Record<string, any>
export type Directives = Record<string, SchemaDirectiveVisitorClass>
export type Operations = Record<
  string,
  (variables: any, ctx: BrowserqlClientContext) => any
>

/**
 * Collection object of scalars
 * [Graphql reference](https://github.com/graphql/graphql-js/blob/main/src/type/definition.d.ts#L300)
 */
export type Scalars = Record<string, GraphQLScalarType>

/**
 * List of subscriptions [WIP]
 */
export type Subscriptions = Record<
  string,
  {
    subscribe(): any
  }
>

/**
 * Connectors for browserql client as an object
 */
export interface BrowserqlClientProperty {
  context?: Context
  directives?: Directives
  mutations?: Operations
  queries?: Operations
  scalars?: Scalars
  schema?: DocumentNode
  subscriptions?: Subscriptions
}

export type BrowserqlClientPropertyFactory = (
  partialClient: Partial<BrowserqlClientProperty>
) => Partial<BrowserqlClientProperty>

export type BrowserqlClientContext = Context & {
  browserqlClient: BrowserqlClient
}

/**
 * Browserql client
 * @example require('@browserql/client')(
 * <br>&nbsp;&nbsp;require('graphql').parse('type Query { hello: String! }')
 * <br>)
 */
export interface BrowserqlClient extends BrowserqlClientProperty {
  apollo: ApolloClient<any>
  cache: InMemoryCache
}
