import * as crypto from "crypto"
import jwt from 'jsonwebtoken'

function generateSalt(length = 16): string {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt(12)
  const iterations = 10000
  const keyLength = 32
  return await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      else resolve(`${salt}:${iterations}:${derivedKey.toString('hex')}`)
    })
  })
}

export async function verifyPassword(stored: string | null, passwordAttempt: string): Promise<boolean> {
  const [storedSalt, storedIterations, storedHash] = stored === null ? ['', '', ''] : stored.split(':')
  if (storedHash === '' && storedSalt === '' && passwordAttempt === '') {
    return true
  } else if (storedSalt === undefined || storedHash === undefined) {
    return false
  } else {
    return await new Promise((resolve, reject) => {
      crypto.pbkdf2(passwordAttempt, storedSalt, parseInt(storedIterations, 10), storedHash.length / 2, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err)
        } else {
          resolve(storedHash === derivedKey.toString('hex'))
        }
      })
    })
  }
}

export const newAccessToken = (attributes: Record<string, any>): string => {
  // TODO: Add expiresIn to .env
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  return jwt.sign(JSON.parse(JSON.stringify({ ...attributes })), process.env.JWT_SECRET as string, options)
}

export const newRefreshToken = (attributes: Record<string, any>): string => {
  // TODO: Add expiresIn to .env
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  return jwt.sign(JSON.parse(JSON.stringify({ ...attributes })), process.env.JWT_SECRET as string, options)
}