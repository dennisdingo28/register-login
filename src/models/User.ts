import mongoose,{ Schema,model,models } from "mongoose";
import defaultProfile from "../assets/defaultProfile.png";


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
        default:defaultProfile,
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


const User = models.Users || model("Users",UserSchema);
const GoogleUser = models.GoogleUsers || model("GoogleUsers",GoogleUserSchema);

export {User,GoogleUser};
