import { useSession } from "next-auth/react";
import jwt,{JwtPayload} from "jsonwebtoken";
import axios from "axios";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { User } from "next-auth";


export default async function useAuthenticatedUser() {
    
    const [authUser,setAuthUser] = useState<Session | null>(null);
    const {data:session} = useSession();
    const [appUser,setAppUser] = useState<string | null>(null);

    useEffect(()=>{
        if(typeof window !=='undefined')
            setAppUser(localStorage.getItem('sessionToken') || null);
    },[]);
    
    useEffect(()=>{
        
        function decodeToken(token: string){
            const decryptedInfo = jwt.decode(token) as JwtPayload;
            return decryptedInfo;
        }
        async function getUser(){
            try {
                if(appUser){
                    const decryptedToken = decodeToken(appUser);
                    console.log("token",decryptedToken);
                    
                    if(decryptedToken){
                        const res = await axios.get(`http://localhost:3000/api/user/getUser/${decryptedToken.id}`);
                        const data = res.data;
                        if(data.ok){
                           setAuthUser(data.user);
                        }
                    }else throw new Error("Token body is null");
                }
                else throw new Error('No token was provided');
            } catch (error) {
                console.log(error);
            }
        }
        if(appUser)
            getUser();
        else{
            if(session)
                setAuthUser(session);
        }
        
    },[appUser]);
    
  
    return authUser;
}
