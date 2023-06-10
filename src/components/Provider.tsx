"use client"

import { FC, ReactNode } from 'react'
import {SessionProvider} from "next-auth/react"
import type { Session } from 'next-auth'
interface ProviderProps {
    children: ReactNode,
}

const Provider: FC<ProviderProps> = ({children}) => {
  return <SessionProvider>
    {children}
  </SessionProvider>
}

export default Provider