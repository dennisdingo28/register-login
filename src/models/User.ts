import mongoose,{ Schema,Model,models,model,Document } from "mongoose";
import defaultProfile from "../assets/defaultProfile.png";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

interface JWTUserPayload {
    id:string,
    name?:string,
    email?:string,
}

interface UserProps {
    name: string;
    email: string;
    password: string;
    image: string;
}


interface UserDocument extends UserProps,Document {
    generateJWT: (payload:JWTUserPayload) => string | null;
}
 
const UserSchema: Schema<UserDocument> = new Schema({
    name: {
        type:String,
        required:[true,'You must provide a name'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"You must provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"You must provide a password"],
        minlength:4
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1675426513141-f0020092d72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    }
});

const GoogleUserSchema = new Schema({
    name: {
        type:String,
        required:[true,'You must provide a name']
    },
    email:{
        type:String,
        required:[true,"You must provide an email"]
    },
    image:{
        type:String,
    },
    isGoogleAccount:{
        type:Boolean,
        default:true,
    }
})


    
UserSchema.methods.generateJWT = function(payload:JWTUserPayload): string | null{
    if(!process.env.JWT_ENCRYPTION || process.env.JWT_ENCRYPTION?.trim()==="")
        return null;
    const token = jwt.sign(payload,process.env.JWT_ENCRYPTION);
    return token;
}
UserSchema.methods.comparePassword = async function(password:string) {
    try{
        const match = await bcrypt.compare(password,this.password);
        return match;
    }catch(err){
        console.log(err);
    }
}

UserSchema.pre('save',async function(){
    try{
        const salt = await bcrypt.genSalt(10);
        if(this.password){
            const hashedPassword = await bcrypt.hash(this.password,salt);
            this.password=hashedPassword;
        }else{
            throw new Error("Password is empty");
        }
    }catch(err){
        console.log(err);
    }
});

const User = models.Users || model<UserDocument>("Users",UserSchema);
const GoogleUser = models.GoogleUsers || model("GoogleUsers",GoogleUserSchema);

export {User,GoogleUser};
