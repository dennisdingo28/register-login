import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
            return true;
        }
    }
}