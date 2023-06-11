import { useSession } from "next-auth/react";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuthenticatedUser() {
  const [authUser, setAuthUser] = useState<any>(null);
  const { data: session } = useSession();
  
  useEffect(() => {
    async function fetchUser(token: string) {
      try {
        if (token) {
          const decryptedToken = decodeToken(token);
          console.log("token", decryptedToken);

          if (decryptedToken) {
            const res = await axios.get(
              `http://localhost:3000/api/user/getUser/${decryptedToken.id}`
            );
            const data = res.data;
            if (data.ok) {
              setAuthUser(data.user);
            }
          } else throw new Error("Token body is null");
        } else throw new Error("No token was provided");
      } catch (error) {
        console.log(error);
      }
    }

    if (typeof window !== "undefined") {
      const appUser = localStorage.getItem("sessionToken");
      if (appUser) fetchUser(appUser);
      else
        if(session)
            setAuthUser(session.user);
    }
  }, [session]);

  function decodeToken(token: string) {
    const decryptedInfo = jwt.decode(token) as JwtPayload;
    return decryptedInfo;
  }

  return authUser;
}
