import mongoose, { Schema, Document } from "mongoose";

// Interface representing a Message document in MongoDB
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

// Schema corresponding to the Message interface
export const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now() // Default value is the current date and time
  }
});

// Interface representing a User document in MongoDB
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptMessage: boolean;
  isVerified: boolean;
  messages: Message[]; // Array of Message documents
}

// Schema corresponding to the User interface
const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify code is required']
  },
  verifyCodeExpiry: {
    type: String,
    required: [true, 'Verify code expiry is required']
  },
  isAcceptMessage: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  messages: [messageSchema] // Embedding Message schema
});

// Creating a User model from the schema, or using an existing one if it already exists
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;
