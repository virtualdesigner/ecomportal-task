import { z } from "zod"
import { ZodString } from "./types"

export const LoginFormSchema = z.object({
  userName: ZodString.min(1, {message: 'Required'}),
  password: ZodString.min(1, {message: 'Required'})
})
export const LoginFormKeys = LoginFormSchema.keyof().enum
export type LoginFormAttributes = z.infer<typeof LoginFormSchema>