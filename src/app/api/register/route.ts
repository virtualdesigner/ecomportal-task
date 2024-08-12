import { hashPassword } from "@/lib/auth"
import { apiPost } from "@/lib/database"

export async function POST(req: Request) {
  const body = await req.json()
  if (body.username && body.password) {
    const query = `
      INSERT INTO users(userName, passwordHash)
      VALUES(?, ?)
    `
    const passwordHash = await hashPassword(body.password)
    const values = [body.username, passwordHash]

    let status, respBody
    await apiPost(query, values)
      .then(() => {
        status = 200
        respBody = { message: 'Successfully created a user.' }
      })
      .catch((err) => {
        status = 400
        respBody = err
      })
    return Response.json(respBody, {
      status,
    })
  }
}
