import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // IMPORTANT: Do NOT redirect API routes. This causes JSON parsing errors in the frontend.
  if (request.nextUrl.pathname.startsWith('/api')) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Proxy: Supabase credentials missing");
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect logic
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');
  const isPublicFile = request.nextUrl.pathname === '/favicon.ico' || request.nextUrl.pathname.startsWith('/_next');

  if (!user && !isAuthPage && !isPublicFile) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    const role = user.user_metadata?.role || 'CUSTOMER'
    
    if (role === 'WORKER') {
      url.pathname = '/worker/dashboard'
    } else {
      url.pathname = '/customer/dashboard'
    }
    return NextResponse.redirect(url)
  }
  
  // Optional: Also redirect from root '/' to the specific dashboards if logged in
  if (user && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    const role = user.user_metadata?.role || 'CUSTOMER'
    
    if (role === 'WORKER') {
      url.pathname = '/worker/dashboard'
    } else {
      url.pathname = '/customer/dashboard'
    }
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
