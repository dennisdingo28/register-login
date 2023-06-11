import { User } from "@/models/User";
import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";

export async function POST(req:Request){
    try{
        await connectDb();
        const {username,email,password} = await req.json();
        
        const user = await User.create({name:username.value,email:email.value,password:password.value});
        const jwt = user.generateJWT({id:user._id,name:username.value,email:email.value});

        return new NextResponse(JSON.stringify({user,token:jwt,ok:true}));

    }catch(err){
        console.log(err);
    }
}