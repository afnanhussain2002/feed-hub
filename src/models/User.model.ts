import mongoose,{Schema, Document, Model} from "mongoose";

export interface Message extends Document{
  content:string;
  createdAt:Date;
}

export const messageSchema:Schema<Message> = new Schema({
     content:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        required:true,
        default:Date.now()
     }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:string;
    isAcceptMessage:boolean;
    isVerified:boolean;
    messages:Message[]

}

const userSchema:Schema<User> = new Schema({
      username:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'Username is required']
      },
      email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'Email is required'],
      },
      password:{
        type:String,
        required:[true,'Password is required'],
      },
      verifyCode:{
        type:String,
        required:[true,'Verify code is required'],
      },
      verifyCodeExpiry:{
        type:String,
        required:[true,'Verify code expiry is required'],
      },
      isAcceptMessage:{
        type:Boolean,
        default:true
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      messages:[messageSchema]
      
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

export default UserModel