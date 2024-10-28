import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { Layout } from 'src/components/layout'
import { authProvider } from 'src/lib/auth-provider'

export default function AuthenticatedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { authenticated, redirectTo } = await authProvider.check(request)

  if (!authenticated) {
    throw redirect(redirectTo ?? '/login')
  }

  return {}
}
