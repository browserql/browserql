fpql::getName | Get type's name
---

Example on how to use `getName` to get the name of a type

```screens
screens:
  - language: graphql
    source: schema.graphql
    description: "The schema graphql with the type in it. Here we omit fields since we are not concerned by them in this example."
  - language: typescript
    source: index.ts
    description: "Proof of concept -- Get type's name with fpql"
  - language: json
    eval: index.ts
    description: "This is the result. As you can see, the right name is returned"
```
