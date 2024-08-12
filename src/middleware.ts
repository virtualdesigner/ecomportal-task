import { refreshAccessToken, verifyAccessToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const tryRefreshAccessToken = async () => {
  try {
    const result = await refreshAccessToken()
    const body = await result.json()
    if (body.success) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_PATH + '/sign-in')
    }
  } catch (err) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_PATH + '/sign-in')
  }
}

const authRoutes = ['/form']

export async function middleware(request: NextRequest) {
  if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const token = request.cookies.get('accessToken')?.value

    // For API routes, we want to return unauthorized instead of
    // redirecting to login
    if (request.nextUrl.pathname.startsWith('/api')) {
      if (!token) {
        const response = {
          success: false,
          message: 'Unauthorized',
        }
        return NextResponse.json(response, { status: 401 })
      }
    }

    if (!token) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_PATH + '/sign-in')
    }

    try {
      const result = await verifyAccessToken()
      const body = await result.json()
      if (body.success) {
        return NextResponse.next()
      } else {
        tryRefreshAccessToken()
      }
    } catch (err) {
      tryRefreshAccessToken()
    }
  } else {
    return NextResponse.next()
  }
}
