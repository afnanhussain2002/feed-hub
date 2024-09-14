import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"
import { jsonResponse } from "@/types/JsonResponse";

export async function POST(requset:Request){
     await dbConnect()
     try {
        
     } catch (error) {
        console.log('Error registering user', error);
        return jsonResponse(false, "Error registering user", 500)
     }
}