"use client"

import { useUserAuthInfo } from "@/providers/UserAuthInfoProvider"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NavigationBar() {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn } = useUserAuthInfo()

  return <div className="flex justify-between w-[100vw] p-3 border-b-2 border-gray-200">
    <div className="flex gap-x-5 pl-10">
      <Link href="/form">Form</Link>
      <Link href="/table">Table</Link>
      <Link href="/any-page">Not Found page</Link>
    </div>
    <div>
      {isLoggedIn &&
        <p className="text-right cursor-pointer [&:hover]:text-red-500" onClick={() => {
          localStorage.removeItem('isLoggedIn')
          setIsLoggedIn(false)
          router.replace('/sign-in')
        }}>Logout</p>
      }
      {!isLoggedIn && <p className="text-right cursor-pointer [&:hover]:text-green-500" onClick={() => {
          router.replace('/sign-in')
        }}>Login</p>
      }
    </div>
  </div>
}