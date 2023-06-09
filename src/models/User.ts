import mongoose,{ Schema,model,models } from "mongoose";
import defaultProfile from "../assets/defaultProfile.png";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
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

const User = models.Users || model("Users",UserSchema);
const GoogleUser = models.GoogleUsers || model("GoogleUsers",GoogleUserSchema);

export {User,GoogleUser};
