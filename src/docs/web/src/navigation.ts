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
      name: 'Integrations',
      nav: [
        {
          name: 'HTTP',
          examples: [
            {
              name: 'Example',
              example: 'http/example'
            }
          ]
        },
        {
          name: 'Firestore',
          nav: [
            {
              name: 'API',
              examples: [
                {
                  name: 'Count',
                  example: 'firestore/count'
                },
                {
                  name: 'Get',
                  example: 'firestore/get'
                },
                {
                  name: 'Get Limit',
                  example: 'firestore/get-limit'
                },
                {
                  name: 'Get Order By',
                  example: 'firestore/get-order-by'
                },
                {
                  name: 'Get Where',
                  example: 'firestore/get-where'
                }
              ]
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
                  example: 'state/example'
                }
              ]
            }
          ],
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
            {
              name: 'Get',
              example: 'cache/get',
            },
          ],
        },
        {
          name: 'GraphiQL',
          examples: [
            {
              name: 'Example',
              example: 'graphiql/example'
            }
          ]
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
