export default {
  navigation: [
    {
      name: 'Client',
      examples: [
        {
          name: 'Example',
          example: 'client/example',
        },
      ],
    },
    {
      name: 'GraphQL utilities',
      nav: [
        {
          name: 'cache',
          examples: [
            {
              name: 'Usage',
              example: 'cache/usage',
            },
          ],
        },
      ],
    },
    {
      name: 'Integrations',
      nav: [
        {
          name: 'HTTP',
          examples: [
            {
              name: 'Example',
              example: ''
            }
          ]
        },
        {
          name: 'Firestore',
          nav: [
            {
              name: 'Usage'
            },
            {
              name: 'React'
            },
          ]
        },
        {
          name: 'React',
          nav: [
            {
              name: 'Components',
              examples: [
                {
                  name: 'Provider',
                  example: 'react/provider-component',
                },
                {
                  name: 'UseQuery',
                  example: 'react/provider-component',
                },
                {
                  name: 'UseMutation',
                  example: 'react/provider-component',
                },
              ],
            },
            {
              name: 'State',
              examples: [
                {
                  name: 'Example',
                  example: ''
                }
              ]
            }
          ],
        },
      ],
    },
    {
      name: 'Misc',
      nav: [
        {
          name: 'FPQL',
          nav: [
            {
              name: 'Get',
              nav: [
                {
                  name: 'Argument',
                  examples: [
                    {
                      name: 'Get argument',
                      example: 'fpql/get-argument',
                    },
                  ],
                },
                {
                  name: 'Fields',
                  examples: [
                    {
                      name: 'Get fields',
                      example: 'fpql/get-fields',
                    },
                  ],
                },
                {
                  name: 'Name',
                  examples: [
                    {
                      name: "Get type's name",
                      example: 'fpql/get-type-name',
                    },
                  ],
                },
                {
                  name: 'Type',
                  examples: [
                    {
                      name: 'Get type',
                      example: 'fpql/get-type',
                    },
                    {
                      name: 'Get types',
                      example: 'fpql/get-types',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'Types',
          examples: [
            {
              name: 'Usage',
              example: 'types/usage',
            },
          ],
        },
      ],
    },
  ],
}
