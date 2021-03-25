# client
---

![npm](https://img.shields.io/npm/v/@browserql/client)

## example

Creates an in-memory GraphQL server that can be used in the browser.

---

```screens
screens:
  - language: graphql
    source: schema.graphql
    description: "The GraphQL schema we'll use. For the sake of example it has only one query."
  - language: graphql
    source: operations.graphql
    description: "The GraphQL executable query we'll use on the client"
  - language: typescript
    source: resolvers.ts
    description: "Our resolvers. Note that it has our query resolver (view schema)"
  - language: typescript
    source: client.ts
    description: "The actual client."
  - language: typescript
    source: query.ts
    description: "Using the client to fire a GraphQL query"
  - language: json
    eval: query.ts
    description: "The query result"
```
