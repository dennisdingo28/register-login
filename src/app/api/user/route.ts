import { User } from "@/models/User";
import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";

export async function POST(req:Request){
    try{
        await connectDb();
        const {username,email,password} = await req.json();
        
        const user = await User.create({username:username.value,email:email.value,password:password.value});
        const jwt = await user.generateJWT({id:user._id,username:username.value,email:email.value});
        console.log(jwt);
        
        return NextResponse.json({user});

    }catch(err){
        console.log(err);
    }
}