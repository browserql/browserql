import type { AppProps } from 'next/app'
import ModulesTabs from '../components/ModulesTabs'
import ModuleTabs from '../components/ModuleTabs'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router: { route } }: AppProps) {
  const [mod, ex] = route.replace(/^\//, '').split('/')

  return (
    <div>
      <div>
        <ModulesTabs />
      </div>

      {mod === 'client' && (
        <ModuleTabs
          links={[
            {
              title: 'README',
              path: '/client/readme',
            },
            {
              title: 'Example',
              path: '/client/example',
            },
          ]}
        />
      )}

      {mod === 'state' && (
        <ModuleTabs
          links={[
            {
              title: 'Example with Apollo',
              path: '/state/example-with-apollo',
            },
            {
              title: 'Example with browserql',
              path: '/state/example-with-browserql',
            },
          ]}
        />
      )}

      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
