import { z } from "zod"

export const ZodString = z.string({ message: 'Expected a string value' })
export const ZodOnlyUppercaseText = ZodString.refine(
  (val) => /^[A-Z]+$/.test(val),
  {
    message: "String must be in uppercase and contain only letters",
  }
)
export const ZodNumber = z.number({message: 'Expected a number value'})