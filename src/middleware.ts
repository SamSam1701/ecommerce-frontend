import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { cookies } from 'next/headers'
import { AppConfig } from './contans'
import { authRoutes, DEFAULT_REDIRECT, privateRoutes } from './utils/routes'

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
  localeDetection: false,
})

// export const config = {
//   // ... other properties
//   matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|public|public/static/).*)"],
// };
export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const cookiesStore = await cookies()
  const isLogin = cookiesStore.get('token')
  const exceptSubRoutes = '/' + nextUrl.pathname.split('/')?.[1]
  const isPrivateRoutes = privateRoutes.includes(exceptSubRoutes)
  const isAuthRoutes = authRoutes.includes(exceptSubRoutes)
  if (isAuthRoutes && isLogin) return NextResponse.redirect(new URL(`${DEFAULT_REDIRECT}`, nextUrl.origin))
  if (isPrivateRoutes && !isLogin) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
