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
              name: 'Add',
              example: 'firestore/add'
            },
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
          name: 'Client',
          examples: [
            {
              name: 'Provider',
              example: 'react/provider-component',
            },
          ],
        },
        {
          name: 'Render-props',
          examples: [
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
    {
      name: 'GraphQL',
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
          name: 'executable',
          examples: [
            {
              name: 'Print executable query',
              example: 'executable/print-executable-query',
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
                  name: 'Field',
                  examples: [
                    {
                      name: 'Get field',
                      example: 'fpql/get-field',
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
                  name: 'Mutation',
                  examples: [
                    {
                      name: 'Get mutation',
                      example: 'fpql/get-mutation',
                    },
                  ],
                },
                {
                  name: 'Mutations',
                  examples: [
                    {
                      name: 'Get mutations',
                      example: 'fpql/get-mutations',
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
