import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "2 character has been required")
  .max(20, "Not maximum then 20 character")
  .regex(/^[a-zA-Z0-9_]{3,16}$/,'Contains only alphanumeric characters (a-z, A-Z, 0-9) and underscores (_');

 export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email'}),
    password:z.string().min(6,'Minimum 6 character has been required')
 })
