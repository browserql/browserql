export default [
    {
    module: 'http',
    example: 'example',
    async load() {
      const { default: View } = await import(
        '@browserql/example-http.example/src/view'
      );
      return View;
    }
  },{
    module: 'react',
    example: 'provider-component',
    async load() {
      const { default: View } = await import(
        '@browserql/example-react.provider-component/src/view'
      );
      return View;
    }
  }
]
  