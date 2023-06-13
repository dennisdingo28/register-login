"use client"

import { FC, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import Loading from '../Loading'
import { useRouter } from 'next/navigation'
import Error from "../Error";


interface AuthProps {
  children:ReactNode,
}

const Auth: FC<AuthProps> = ({children}) => {
        const [authToken,setAuthToken] = useState<string | null>(null);

        const [isLoading,setIsLoading] = useState<boolean>(true);

        useEffect(()=>{
            setAuthToken(localStorage.getItem('sessionToken') || localStorage.getItem('googleSessionToken') || null);
            setIsLoading(false);
        },[]);

        if(isLoading){
            return <Loading message='loading the dashboard'/>
        }else{
            if(authToken){
                return <div className="">{children}</div>
            }else{
                return (
                    <Error message='you are not authenticated'/>
                )
            }
        }
    
    
}

export default Auth