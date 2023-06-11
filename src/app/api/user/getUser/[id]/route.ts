import { User } from "@/models/User";
import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";

export async function GET(req:Request,{params}:{params:{id:string}}){
    console.log('params',params);
    try{
        await connectDb();
        const id = params.id;
        console.log("id",id);
        
        const user = await User.findById({_id:id});
        console.log(user);
        
        if(!user)
            throw new Error("User id was not provided");
        
        return new NextResponse(JSON.stringify({user,ok:true}));
    }catch(err){
        console.log("err here",err);
    }
}