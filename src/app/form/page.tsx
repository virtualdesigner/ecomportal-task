"use client"

import Button from "@/components/Button"
import { NumberInput, TextInput } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FormProvider from "../providers/FormProvider"

const ZodString = z.string({ message: 'Expected a string value' })
const ZodOnlyUppercaseText = ZodString.refine(
  (val) => /^[A-Z]+$/.test(val),
  {
    message: "String must be in uppercase and contain only letters",
  }
)
const ZodNumber = z.number({message: 'Expected a number value'})

const UserFormSchema = z.object({
  name: ZodOnlyUppercaseText,
  age: ZodNumber.min(5).max(15),
  nickName: ZodString.optional()
})
const UserFormKeys = UserFormSchema.keyof().enum
type UserFormAttributes = z.infer<typeof UserFormSchema>

export default function Form() {

  const { register, handleSubmit, formState } = useForm<UserFormAttributes>({
    resolver: zodResolver(UserFormSchema),
  })
  
  return (
    <FormProvider value={{ errors: formState.errors, register }}>
      <form onSubmit={handleSubmit((data) => console.log(data))} className="h-[100vh] flex flex-col justify-center items-center">
        <TextInput label="Name" dataKey={UserFormKeys.name} />
        <TextInput label="Nick name" dataKey={UserFormKeys.nickName} />
        <NumberInput label="Age" dataKey={UserFormKeys.age} />
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  )
}