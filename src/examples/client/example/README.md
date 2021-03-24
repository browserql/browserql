# client
---

## example
---

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
  - language: json
    eval: index.ts
    description: "File result"
```
