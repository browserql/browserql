export default [
  {
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
