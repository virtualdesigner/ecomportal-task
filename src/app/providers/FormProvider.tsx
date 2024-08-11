'use client'

import { createContext, useContext } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type FormValues = {
  register?: UseFormRegister<any>,
  errors: FieldErrors<any>,
}

const initValues = {
  register: undefined,
  errors: {},
}

const FormContext = createContext<FormValues>(initValues)

export const useFormContext = () => useContext(FormContext)

export default FormContext.Provider