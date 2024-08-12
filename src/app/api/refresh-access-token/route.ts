import { verifyJWTToken } from '@/lib/auth'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { generateTokensAndAddToCookies } from '../login/route'

export async function GET(req: NextRequest, res: NextResponse) {
  let isValidToken = false
  const refreshToken = req.cookies.get('refreshToken')
  if (typeof refreshToken === 'string') {
    try {
      isValidToken = verifyJWTToken(refreshToken)
      if (isValidToken) {
        const decodedToken = jwt.decode(refreshToken) as {id: number, userName: string}
        const user = {id: decodedToken.id, userName: decodedToken.userName}
        return await generateTokensAndAddToCookies(user, res)
      }
    } catch (err) {
      console.log('Error during refreshToken validation', err)
      return Response.json({ success: false }, {
        status: 403,
      })
    }
  }
  return Response.json({ success: isValidToken }, {
    status: 200,
  })
}
