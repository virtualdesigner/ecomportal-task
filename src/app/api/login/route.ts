import { newAccessToken, newRefreshToken, verifyPassword } from '@/lib/auth';
import { aDayInMilliseconds } from '@/lib/constants';
import { apiGet, apiPost } from '@/lib/database';
import { NextResponse } from 'next/server';

const ENVIRONMENT = process.env.NODE_ENV || "development";

export const generateTokensAndAddToCookies = async (
  user: { id: number; userName: string },
  res: Response
) => {
  const refreshToken = newRefreshToken({ id: user.id, userName: user.userName })
  const accessToken = newAccessToken({ id: user.id, userName: user.userName })
  const query = `UPDATE users SET refreshToken=? WHERE id=?`
  try {
    await apiPost(query, [refreshToken, user.id.toString()])
  } catch (err) {
    console.error('Error while storing the refreshToken.', err)
    return NextResponse.json({
      status: 500,
      body: { success: false, message: 'Server error.' }
    })
  }
  const response = NextResponse.json({
    ...res,
    body: { success: true }
  })
  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    expires: Date.now() + (aDayInMilliseconds * 400),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    expires: Date.now() + (aDayInMilliseconds * 400),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
  return response
}

export async function POST(req: Request, res: Response) {
  const body = await req.json()
  if (body.userName && body.password) {
    const query = `
      SELECT * FROM users WHERE username='${body.userName}'
    `
    let user, isVerifiedUser
    try {
      user = (
        (await apiGet(query)) as [
          { id: number; userName: string; passwordHash: string }
        ]
      )?.[0]
      isVerifiedUser = await verifyPassword(user.passwordHash, body.password)
    } catch {
      return Response.json({
        status: 400,
        body: { success: false, message: 'Invalid credentials.' }
      })
    }

    let status = 200
    if (isVerifiedUser) {
      try {
        return await generateTokensAndAddToCookies(user, res)
      } catch (err) {
        return Response.json({
          status: 500,
          body: { success: false, message: 'Server error.' }
        })
      }
    } else {
      return Response.json({
        status,
        body: { success: false, message: 'Invalid credentials.' }
      })
    }
  } else {
    return Response.json({
      status: 400,
      body: { success: false, message: 'Invalid credentials.' }
    })
  }
}
