export default {
  module: "firestore",
  name: "delete",
  source: `# firestore

***

## delete

***

Test test test

\`\`\`screens
screens:
  - language: typescript
    source: |-
      export default async function() {
        return 'Hello world!'
      }
    description: File
    name: index.ts
  - language: json
    eval: index.ts
    description: File result
    name: index.ts
    source: Hello world!

\`\`\`
`
}
