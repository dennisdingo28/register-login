import mongoose,{ Schema,Model,models,model,Document } from "mongoose";
import defaultProfile from "../assets/defaultProfile.png";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

interface JWTUserPayload {
    id:string,
    username?:string,
    email?:string,
}


interface UserProps {
    username: string;
    email: string;
    password: string;
    image: string;
}


interface UserDocument extends UserProps,Document {
    generateJWT: (payload:JWTUserPayload) => string | null;
}
 


const UserSchema: Schema<UserDocument> = new Schema({
    username: {
        type:String,
        required:[true,'You must provide an username']
    },
    email:{
        type:String,
        required:[true,"You must provide an email"]
    },
    password:{
        type:String,
        required:[true,"You must provide a password"],
        minlength:4
    },
    image:{
        type:String,
        default:"../assets/defaultProfile.png",
    }
});

const GoogleUserSchema = new Schema({
    username: {
        type:String,
        required:[true,'You must provide an username']
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
