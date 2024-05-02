import mongoose,{Schema,Document} from "mongoose"
//Document is for typesafety
//whenever we use ts we define the datatype of data
//to define type we use interface

export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        tupe:Date,
        required:true,
        default: Date.now
    }

})



export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    isVerified:boolean;
    messages:Message[];
}



const UserSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true ,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true ,"Email is required"],
        trim:true,
        unique:true,
        match:[/.+\@.+\..=/,'Please use a valid email address']
    },
    password:{
        type:String,
        required:[true ,"Password is required"],

    },
    verifyCode:{
        type:String,
        required:[true ,"verifyCode is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true ,"verifyCode Expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]
})

//nextjs runs code on edgetime
//in express once server ban gaya it goes on running but next doesnt work like that
//next mein aisa hota hai ki first time app is booted or pahle bhi its done so export mein we check two cases
//pahla agar first boot hai toh go doxument banao and return
//else return existing doc 
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel