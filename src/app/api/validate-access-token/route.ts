import { verifyJWTToken } from '@/lib/auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  let isValidToken = false
  const accessToken = req.cookies.get('accessToken')
  if (typeof accessToken === 'string') {
    try {
      isValidToken = verifyJWTToken(accessToken)
    } catch (err) {
      console.log('Error during accessToken validation', err)
    }
  }
  return Response.json({ success: isValidToken }, {
    status: 200,
  })
}
