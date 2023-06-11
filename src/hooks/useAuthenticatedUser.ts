import { useSession } from "next-auth/react";
import jwt,{JwtPayload} from "jsonwebtoken";
import axios from "axios";

export default async function useAuthenticatedUser() {
    const {data:session} = useSession();
    let data;
    try{
        if (typeof window !== "undefined") {
            const appUser = localStorage.getItem("sessionToken");
            if(appUser)
            {
                data=appUser;
                const decodedToken = jwt.decode(data) as JwtPayload;
                if(!decodedToken || !decodedToken.id)
                    throw new Error("No token was provided");
                    
                const res = await axios.get(`/api/user/getUser/${decodedToken.id}`);
                console.log(res);
                
            }else{
                if(session)
                    data=session;
            }
            data=null;
            return data;
        }
        return data=null;
    }catch(err){

        console.log(err);
        return null;
    }
}
