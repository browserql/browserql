import type { BrowserqlClientPropertyFactory } from '@browserql/types'
import {
  getArgument,
  getDirective,
  getMutations,
  getName,
  getQueries,
  getValue,
} from '@browserql/fpql'
import { gql } from '@apollo/client'
import { ArgumentNode, DirectiveNode, DocumentNode, ValueNode } from 'graphql'
import { HeadersJSONObject, QueryJSONObject } from './scalars'

interface ConnectHttpOptions {}

export function connectHttp(options: ConnectHttpOptions = {}): BrowserqlClientPropertyFactory {
  return function ({ schema }) {
    const ourSchema = gql`
      enum HttpMethod {
        DELETE
        GET
        HEAD
        OPTIONS
        PATCH
        POST
        PUT
      }

      directive @http(
        url: String
        method: HttpMethod
        headers: HeadersJSONObject
        debug: Boolean
        query: QueryJSONObject
      ) on FIELD_DEFINITION

      scalar HeadersJSONObject
      scalar QueryJSONObject
    `
    const makeResolver = (
      type: 'query' | 'mutation',
      http: DirectiveNode
    ) => async (variables: any) => {
      let endpoint = ''
      const options: Partial<RequestInit> = {}

      const url = getArgument('url')(http)
      const method = getArgument('method')(http)
      const headers = getArgument('headers')(http) as ArgumentNode
      const debug = getArgument('debug')(http)
      const query = getArgument('query')(http)

      if (url) {
        endpoint = getValue(url)
      }

      if (method) {
        options.method = getValue(method)
      }

      for (const key in variables) {
        endpoint = endpoint.replace(
          new RegExp(`:${key}(\\W|$)`, 'g'),
          `${variables[key]}$1`
        )
      }

      if (headers) {
        options.headers = getValue(headers)
      }

      if (debug) {
        console.log(endpoint, options)
      }

      if (query) {
        const params = new URLSearchParams(getValue(query))
        endpoint += `?${params.toString()}`
      }

      let response: any

      try {
        response = await fetch(endpoint, options)
      } catch (error) {
        throw new Error(
          `Failed to fetch ${endpoint} -- ${JSON.stringify(options)}`
        )
      }

      try {
        const res = await response.json()

        if (debug) {
          console.log(res)
        }

        return res
      } catch (error) {
        throw new Error(`NOT A JSON: ${endpoint} -- ${JSON.stringify(options)}`)
      }
    }

    const targetQueries = getQueries(schema as DocumentNode)
      .filter((query) => getDirective('http')(query))
      .reduce((queries, query) => {
        const http = getDirective('http')(query)

        if (http) {
          return {
            ...queries,
            [getName(query)]: makeResolver('query', http),
          }
        }

        return queries
      }, {})

    const targetMutations = getMutations(schema as DocumentNode)
      .filter((query) => getDirective('http')(query))
      .reduce((queries, query) => {
        const http = getDirective('http')(query)

        if (http) {
          return {
            ...queries,
            [getName(query)]: makeResolver('mutation', http),
          }
        }

        return queries
      }, {})

    return {
      schema: ourSchema,
      queries: targetQueries,
      mutations: targetMutations,
      scalars: {
        HeadersJSONObject,
        QueryJSONObject,
      },
    }
  }
}
