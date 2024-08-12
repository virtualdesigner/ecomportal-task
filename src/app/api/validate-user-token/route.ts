import * as jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  let isValidToken = false
  const accessToken = req.cookies.get('accessToken')
  if (typeof accessToken === 'string') {
    try {
      isValidToken = !!jwt.verify(accessToken, process.env.JWT_SECRET as string)
      console.log('isValidToken: ', isValidToken)
    } catch (err) {
      console.log('Error during accessToken validation', err)
    }
  }
  return Response.json({ isValidToken }, {
    status: 200,
  })
}
