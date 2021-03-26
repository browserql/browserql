export default {
  module: "react",
  name: "provider-component",
  source: `# react

***

![npm](https://img.shields.io/npm/v/@browserql/react)

## Provider component

***

Test test test

\`\`\`screens
screens:
  - language: typescript
    source: |
      import React from 'react';

      export default function View() {
        return <div>Hey</div>;
      }
    description: File
    name: view.tsx
  - language: react
    eval: view.tsx
    description: File result
    name: view.tsx
    source: ""

\`\`\`
`
}
