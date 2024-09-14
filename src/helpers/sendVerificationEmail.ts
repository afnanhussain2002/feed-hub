import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(email:string, username:string): Promise<ApiResponse>{
    try {
        
    } catch (error) {
        console.log("Error sending verification email");
        
    }
}