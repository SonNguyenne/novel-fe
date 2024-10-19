import { auth } from '@/auth'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import _ from 'lodash'
import { UserRole } from './types'

export default auth((req: NextRequest) => {
  const user = _.get(req, 'auth.user.user') as UserRole | undefined

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
  // matcher: ['/admin((?!api|error|_next/static|_next/image|favicon.ico).*)'],
}
