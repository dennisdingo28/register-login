import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const data = await req.json();

        const email = data.formStates.email.value;
        const password = data.formStates.password.value;
        
        const user = await User.findOne({email:email});
        console.log(user);
        
        if(!user)
            throw new Error("Cannot find any users");
        
        const passwordMatch = await user.comparePassword(password);
      
        if(passwordMatch){
            const jwt = user.generateJWT({id:user._id,name:user.name,email:user.email})
          
            return new NextResponse(JSON.stringify({user,token:jwt,ok:true}));     
        }
           
        throw new Error("Password doesn't match");
        

    }catch(err){
        console.log(err);
        
    }
   
    
    return new NextResponse(JSON.stringify({ req }))
       
}