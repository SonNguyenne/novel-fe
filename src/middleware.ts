import { auth } from '@/auth'
import { NextResponse, NextRequest } from 'next/server'
import { get } from 'lodash'
import { UserRole } from './types'

export default auth((req: NextRequest) => {
  const user = get(req, 'auth.user.user') as UserRole | undefined

  if (!user) {
    if (req.nextUrl.pathname !== '/error') {
      return NextResponse.redirect(new URL('/error', req.url))
    }
  }

  const hasPermission = user && (user.role === 'ADMIN' || user.role === 'MANAGER')

  if (!hasPermission) {
    if (req.nextUrl.pathname !== '/error') {
      return NextResponse.redirect(new URL('/error', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
  unstable_allowDynamic: ['**/node_modules/lodash/_root.js'],
  // matcher: ['/admin((?!api|error|_next/static|_next/image|favicon.ico).*)'],
}
