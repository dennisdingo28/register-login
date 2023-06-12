import { useSession } from "next-auth/react";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dispatch,SetStateAction } from "react";
import { User } from "@/types/user";
import { User as UserSession } from "next-auth";

interface AuthHookProps {
    authenticatedUserLoading?: boolean | null,
    setAuthenticatedUserLoading?:Dispatch<SetStateAction<boolean | null>>
}

export default function useAuthenticatedUser({authenticatedUserLoading,setAuthenticatedUserLoading}:AuthHookProps) {
  const [authUser, setAuthUser] = useState<User | UserSession>();
  const { data: session } = useSession();
  
  

  useEffect(() => {
    async function fetchUser(token: string) {
      try {
        if(setAuthenticatedUserLoading)
          setAuthenticatedUserLoading(true);
        if (token) {
          const decryptedToken = decodeToken(token);
          if (decryptedToken) {
            
            const res = await axios.get(
              `http://localhost:3000/api/user/getUser/${decryptedToken.id}`
            );
            if(setAuthenticatedUserLoading)
              setAuthenticatedUserLoading(false);
            const data = res.data;
            if (data.ok) {
              setAuthUser(data.user);
            }
         
          } else throw new Error("Token body is null");
        } else throw new Error("No token was provided");
      } catch (error) {
        if(setAuthenticatedUserLoading)
            setAuthenticatedUserLoading(false);

        console.log(error);
      }
    }
 
    if (typeof window !== "undefined") {
      const appUser = localStorage.getItem("sessionToken");
      if (appUser){
      
        fetchUser(appUser);
        
      } 
      else
        if(session){
          if(setAuthenticatedUserLoading)
            setAuthenticatedUserLoading(true);
          setAuthUser(session.user);
          if(session.user)
              localStorage.setItem("googleSessionToken",session.user.token);
          if(setAuthenticatedUserLoading)
            setAuthenticatedUserLoading(false);
        }
    }
    
  }, [session]);

  function decodeToken(token: string) {
    const decryptedInfo = jwt.decode(token) as JwtPayload;
    return decryptedInfo;
  }

  return authUser;
}
