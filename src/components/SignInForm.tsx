import { LoginFormAttributes, LoginFormKeys, LoginFormSchema } from "@/lib/zod/schema"
import FormProvider from "@/providers/FormProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import Button from "./Button"
import { TextInput } from "./input"

export const SignInForm = () => {
  const { register, reset, handleSubmit, formState } = useForm<LoginFormAttributes>({
    resolver: zodResolver(LoginFormSchema),
  })

  const isLoginDisabled = useMemo(() => {
    return formState.isSubmitting || !formState.isValid
  }, [formState.isSubmitting, formState.isValid])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      await fetch('./api/login', {
        method: 'POST',
        body: JSON.stringify({ ...data })
      })
    } catch (err) {
      console.error('Problem logging in.', err)
    }
    // reset()
  })

  return (
    <div className='w-full h-screen bg-sky-100 bg-opacity-50 flex justify-center items-center'>
      <div className='w-1/7'>
        <FormProvider value={{ errors: formState.errors, register }}>
          <form onSubmit={onSubmit}>
            <TextInput label="Username" dataKey={LoginFormKeys.userName} />
            <TextInput label="Password" dataKey={LoginFormKeys.password} />
            <Button type="submit" disabled={isLoginDisabled}>Login</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
