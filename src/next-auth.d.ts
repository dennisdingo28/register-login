import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User{
        _id:string,
        token:string,
        isGoogleAccount:boolean
    }
    interface Session extends DefaultSession{
        user?:User
    }
}