import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en', 'es']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang) {
    const preferred = acceptLang.split(',')[0]
    const found = locales.find((locale) => preferred.startsWith(locale))
    if (found) return found
  }
  return locales[0]
}

export const config = {
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\..+).*)'],
}
