import { login } from "@/lib/auth"
import { LoginFormAttributes, LoginFormKeys, LoginFormSchema } from "@/lib/zod/schema"
import FormProvider from "@/providers/FormProvider"
import { useUserAuthInfo } from "@/providers/UserAuthInfoProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import Button from "./Button"
import { TextInput } from "./input"

export const SignInForm = () => {
  const { register, reset, handleSubmit, formState } = useForm<LoginFormAttributes>({
    resolver: zodResolver(LoginFormSchema),
  })
  const router = useRouter()
  const { setIsLoggedIn } = useUserAuthInfo()

  const onSubmit = useMemo(() => handleSubmit(async (data) => {
    try {
      const res = await login(data)
      const { body } = await res.json()
      if (body.success) {
        localStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
        router.replace('/form')
      }
    } catch (err) {
      console.error('Problem logging in.', err)
      window.alert('Login failed. Please try again.')
      reset()
    }
  }), [handleSubmit, reset, router, setIsLoggedIn])

  const formProviderData = useMemo(() => {
    return { errors: formState.errors, register }
  }, [formState.errors, register])

  const isLoginDisabled = useMemo(() => {
    return formState.isSubmitting || !formState.isValid
  }, [formState.isSubmitting, formState.isValid])

  return (
    <div className='w-full h-screen bg-sky-100 bg-opacity-50 flex justify-center items-center'>
      <div className='w-1/7'>
        <FormProvider value={formProviderData}>
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
