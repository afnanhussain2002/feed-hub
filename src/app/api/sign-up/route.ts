import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";
import { jsonResponse } from "@/types/JsonResponse";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();
  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = await request.json();

    // Check if a verified user with the same username already exists
    const existingUserByUsername = await UserModel.find({
      username,
      isVerified: true,
    });

    // If a verified user with the same username exists, return an error response
    if (existingUserByUsername) {
      return jsonResponse(false, "Username is already exists", 401);
    }

    // Check if a user with the same email already exists
    const existingUserByEmail = await UserModel.findOne({ email });
    // Generate a verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // If the email is already verified, return an error response
      if (existingUserByEmail.isVerified) {
        return jsonResponse(false, "Email already exists", 401);
      } else {
        // If the email is not verified, update the user's password and verification code
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
        await existingUserByEmail.save();
      }
    } else {
      // If the email does not exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Set verification code expiry to 1 hour

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

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    console.log('Email response--------------', emailResponse);
    if (!emailResponse.success) {
      return jsonResponse(false, emailResponse.message, 501);
    }
    return jsonResponse(true, "User registered successfully, Please verify your email", 200);

  } catch (error) {
    console.log("Error registering user", error);
    return jsonResponse(false, "Error registering user", 500);
  }
}
