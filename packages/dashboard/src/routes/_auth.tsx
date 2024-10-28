import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { authProvider } from 'src/lib/auth-provider'

export default function AuthLayout() {
  return <Outlet />
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { authenticated, redirectTo } = await authProvider.check(request)

  if (authenticated) {
    throw redirect(redirectTo ?? '/')
  }

  return {}
}
