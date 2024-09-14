import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"
import { jsonResponse } from "@/types/JsonResponse";


export async function POST(request:Request){
     await dbConnect()
     try {
       const {username, email, password} = await request.json()

      const existingUserByUsername = await UserModel.find({
        username,
        isVerified:true
       })

       if (existingUserByUsername) {
        return jsonResponse(false,"Username  is already exists",401)
       }

       const existingUserByEmail = await UserModel.findOne({email})

       if (existingUserByEmail) {
        true
       }else{
        const hashedPassword = await bcrypt.hash(password, 10)
        
       }

     } catch (error) {
        console.log('Error registering user', error);
        return jsonResponse(false, "Error registering user", 500)
     }
}