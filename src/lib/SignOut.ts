import { signOut } from "next-auth/react";

export default function SignOut(user:any){
    if(user.isGoogleAccount){
        signOut();
    }else{
        if(typeof window !=='undefined'){
            localStorage.removeItem('sessionToken');
            window.location.reload();
        }
    }
}