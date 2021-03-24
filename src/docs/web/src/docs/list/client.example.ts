export default {
  module: "client",
  name: "example",
  source: `# client

***

## example

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
