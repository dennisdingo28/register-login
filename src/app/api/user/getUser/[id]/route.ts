import { User } from "@/models/User";
import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";

export async function GET(req:Request,{params}:{params:{id:string}}){
    console.log('params',params);
    try{
        await connectDb();
        const id = params.id;
        const user = await User.findById(id);
        if(!user)
            throw new Error("User id was not provided");
        
        NextResponse.json({user,ok:true});
    }catch(err){
        console.log(err);
    }
}