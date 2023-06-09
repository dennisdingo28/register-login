import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "@/utils/connectDb";
import { GoogleUser } from "@/models/User";

function getGoogleCredintials(){
    const clientId=process.env.GOOGLE_CLIENTID;
    const clientSecret=process.env.GOOGLE_CLIENTSECRET;

    if(!clientId || clientId.length===0)
        throw new Error("Client id was not provider for google provider set");
    if(!clientSecret || clientSecret.length===0)
        throw new Error("Client secret was not provided for google provider set");

    return {clientId,clientSecret};
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId:getGoogleCredintials().clientId,
            clientSecret:getGoogleCredintials().clientSecret,
        })
    ],callbacks:{
        async signIn({user,account,profile}){
            try{
                await connectDb();
                
                const existingGoogleUser = await GoogleUser.findOne({username:user.name,email:user.email});

                if(!existingGoogleUser){
                    await GoogleUser.create({username:user.name,email:user.email,image:user.image});
                }
                return true;
            }catch(err){
                console.log(err);
                return false;
            }
        },
        async jwt({user,account,token}){
            
            if(user && account){
                token.token=account.id_token;
            }
            
            return token;
        },
        async session({session,token}){
            
            const sessionUser = await GoogleUser.findOne({email:session?.user?.email,username:session?.user?.name});
            if(session && session?.user){
                
                session.user._id=sessionUser._id.toString();
            }
            
            return session;
        }
    }
}