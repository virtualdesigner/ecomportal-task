'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type UserAuthInfo = {
  isLoggedIn?: boolean,
  setIsLoggedIn: (value: boolean) => void
}

const initValues = {
  setIsLoggedIn: () => {}
}

const UserAuthInfoContext = createContext<UserAuthInfo>(initValues)

export const useUserAuthInfo = () => useContext(UserAuthInfoContext)

export default function UserAuthInfoProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
  
  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem('isLoggedIn') === 'true')
  }, [])

  return <UserAuthInfoContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</UserAuthInfoContext.Provider>
}