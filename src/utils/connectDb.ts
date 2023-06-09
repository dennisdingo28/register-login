import mongoose from "mongoose";

let isConnected = false;

export default async function connectDb(){
    mongoose.set('strictQuery',true);
    if(isConnected)
    {
        console.log('MongoDB is already connected');
        return;
    }
    try{
        if(!process.env.MONGO_URI || process.env.MONGO_URI.trim()==='')
        {
            throw new Error("No mongoDB url was provided");
        }
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            dbName:"register-login",
        });
        isConnected=true;

        console.log('MongoDB connected');
        
    }catch(err){
        console.log(err);
    }
}