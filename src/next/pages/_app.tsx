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
              title: 'Example',
              path: '/state/example',
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
