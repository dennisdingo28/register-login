import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User{
        _id:string
    }
    interface Session extends DefaultSession{
        user?:User
    }
}