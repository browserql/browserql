# cache
---

## usage
---

Helper around [apollo-cache](https://www.apollographql.com/docs/react/caching/cache-configuration/)

```javascript
import connectCache from '@browserql/cache'

const cached = connectCache(cache, schema)

cached.get(QUERY, {})
cached.set(QUEY, {}, {})
```

```screens
screens:
  - language: graphql
    source: schema.graphql
    description: "The GraphQL schema we'll use"
  - language: typescript
    source: client.ts
    description: "Generate client"
  - language: typescript
    source: index.ts
    description: "File"
  - language: json
    eval: index.ts
    description: "File result"
```
