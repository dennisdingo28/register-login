"use client"

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser'
import { FC, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import Loading from '../Loading'

interface AuthProps {
  children:ReactNode,
}

const Auth: FC<AuthProps> = ({children}) => {
    const [authenticatedUserLoading,setAuthenticatedUserLoading] = useState<boolean | null>(false);

    const user = useAuthenticatedUser({authenticatedUserLoading,setAuthenticatedUserLoading});
   

    return (
        <div className="">
            {authenticatedUserLoading ? <Loading message='Loading the dashboard...'/>:(user ? <div>
                <h1>Protected page for authenticated users only</h1>
            </div>:<p>you are not authenticated</p>)}
        </div>
    )
}

export default Auth