import { useFormContext } from "@/providers/FormProvider"
import { ChangeEvent } from "react"

type TextInputProps<Key extends string> = {
  label: string,
  value?: string | number,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  dataKey: Key
}

export const TextInput = <Key extends string>({
  label, dataKey
}: TextInputProps<Key>) => {
  const { errors, register } = useFormContext()
  
  return (
    <div className="flex flex-col gap-1 w-fit">
      <div className="flex flex-col border border-2 [&:hover]:border-red px-3 py-2 w-fit rounded-lg">
        <label>{label}</label>
        <input {...(register?.(dataKey) || {})} className="b-none  text-xl outline-none bg-transparent font-normal" />
      </div>
      <span className="text-red-400 text-sm">{errors[dataKey as string]?.message?.toString() || ' '}</span>
    </div>
  )
}

export const NumberInput = <Key extends string>({
  label, dataKey
}: TextInputProps<Key>) => {
  const { errors, register } = useFormContext()

  return (
    <div className="flex flex-col gap-1 w-fit">
      <div className="flex flex-col border border-2 [&:hover]:border-red px-3 py-2 w-fit rounded-lg">
      <label>{label}</label>
        <input {...(register?.(dataKey, {valueAsNumber: true}) || {})} className="b-none  text-xl outline-none bg-transparent font-normal" />
      </div>
      <span className="text-red-400 text-sm">{errors[dataKey as string]?.message?.toString() || '  '}</span>
    </div>
  )
}