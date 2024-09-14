import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";
import { jsonResponse } from "@/types/JsonResponse";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserByUsername = await UserModel.find({
      username,
      isVerified: true,
    });

    if (existingUserByUsername) {
      return jsonResponse(false, "Username  is already exists", 401);
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      true;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    console.log('Email response--------------', emailResponse);
    if (!emailResponse.success) {
        return jsonResponse(false, emailResponse.message, 501);
    }
  } catch (error) {
    console.log("Error registering user", error);
    return jsonResponse(false, "Error registering user", 500);
  }
}
