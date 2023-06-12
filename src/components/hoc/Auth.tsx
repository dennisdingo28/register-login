"use client"

import { FC, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import Loading from '../Loading'
import { useRouter } from 'next/navigation'
interface AuthProps {
  children:ReactNode,
}

const Auth: FC<AuthProps> = ({children}) => {
        const router = useRouter();
        const [authToken,setAuthToken] = useState<string | null>(null);

        const [isLoading,setIsLoading] = useState<boolean>(true);


        useEffect(()=>{
            setAuthToken(localStorage.getItem('sessionToken') || localStorage.getItem('googleSessionToken') || null);
            setIsLoading(false);
        },[])

        if(isLoading){
            return <Loading message='loading the dashboard'/>
        }else{
            if(authToken){
                return <div className="">{children}</div>
            }else{
                return (
                    <div className="h-screen flex justify-center items-center gap-2">
                        <h1 className='font-bold text-[2em]'>you are not authenticated</h1>
                        <button onClick={()=>router.push('/')} className='bg-darkPurple p-2 rounded-md text-white font-medium'>back home</button>
                    </div>
                )
            }
        }
    
    
}

export default Auth