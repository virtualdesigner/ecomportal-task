"use client"

import Button from "@/components/Button"
import { NumberInput, TextInput } from "@/components/input"
import { ZodNumber, ZodOnlyUppercaseText, ZodString } from "@/lib/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FormProvider from "../../providers/FormProvider"

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
      <form onSubmit={handleSubmit((data) => console.log(data))} className="h-[100vh] flex flex-col justify-center items-center gap-1">
        <TextInput label="Name" dataKey={UserFormKeys.name} />
        <TextInput label="Nick name" dataKey={UserFormKeys.nickName} />
        <NumberInput label="Age" dataKey={UserFormKeys.age} />
        <Button type='submit' className="mt-2">Submit</Button>
      </form>
    </FormProvider>
  )
}