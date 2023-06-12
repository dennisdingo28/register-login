import { signOut } from "next-auth/react";
import { User } from "@/types/user";
import { User as UserSession } from "next-auth";

export default function SignOut(user:User | UserSession){
    if(user.isGoogleAccount){
        signOut();
    }else{
        if(typeof window !=='undefined'){
            window.location.reload();
        }
    }
    localStorage.removeItem('sessionToken');
}