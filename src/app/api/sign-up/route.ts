import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"
import { jsonResponse } from "@/types/JsonResponse";


export async function POST(request:Request){
     await dbConnect()
     try {
       const {username, email, password} = await request.json()

      const existingUserByEmail = await UserModel.find({
        email,
        isVerified:true
       })

       if (existingUserByEmail) {
        return jsonResponse(false,"Email is already exists",401)
       }
       
     } catch (error) {
        console.log('Error registering user', error);
        return jsonResponse(false, "Error registering user", 500)
     }
}