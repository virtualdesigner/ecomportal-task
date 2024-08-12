import { newAccessToken, newRefreshToken, verifyPassword } from "@/lib/auth"
import { aDayInMilliseconds } from "@/lib/constants"
import { apiGet, apiPost } from "@/lib/database"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  const body = await req.json()
  if (body.userName && body.password) {
    const query = `
      SELECT * FROM users WHERE username='${body.userName}'
    `
    let user, isVerifiedUser
    try {
      user = ((await apiGet(query)) as [{ id: number, userName: string, passwordHash: string }])?.[0]
      isVerifiedUser = await verifyPassword(user.passwordHash, body.password)
    } catch {
      return Response.json({
        status: 400,
        body: 'Invalid credentials.'
      })
    }

    let status = 200, respBody
    if (isVerifiedUser) {
      const refreshToken = newRefreshToken({ id: user.id, userName: user.userName })
      const accessToken = newAccessToken({ id: user.id, userName: user.userName })
      const query = `
        UPDATE users SET refreshToken=? WHERE id=?
      `
      try {
        await apiPost(query, [refreshToken, user.id.toString()])
      } catch (err) {
        console.error('Error while storing the refreshToken.', err)
        return Response.json({
          status: 500,
          body: 'Server error.'
        })
      }
      const response = NextResponse.json(res);
      response.cookies.set({
        name: 'accessToken',
        value: accessToken,
        path: '/',
        expires: aDayInMilliseconds,
        httpOnly: true,
        sameSite: 'strict'
      })
      return response
    } else {
      status = 400
    }
    return Response.json(respBody, {
      status,
    })
  } else {
    return Response.json({
      status: 400,
      body: 'Invalid credentials.'
    })
  }
}
