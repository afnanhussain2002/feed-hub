import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"

export async function POST(requset:Request){
     await dbConnect()
     try {
        
     } catch (error) {
        console.log('Error registering user', error);
     }
}