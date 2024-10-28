import { Refine } from '@refinedev/core'
import routerProvider, { UnsavedChangesNotifier } from '@refinedev/remix-router'
import type { MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { authProvider } from 'src/lib/auth-provider'
import { dataProvider } from 'src/lib/data-provider'
import 'src/root.css'

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: '',
    viewport: 'width=device-width,initial-scale=1'
  }
]

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          authProvider={authProvider}
          resources={[
            {
              name: 'posts',
              list: '/posts',
              create: '/posts/create',
              edit: '/posts/edit/:id'
            }
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true
          }}
        >
          <Outlet />
          <UnsavedChangesNotifier />
        </Refine>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
