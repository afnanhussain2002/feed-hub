import mongoose from "mongoose";

// Define a type for the connection object to track the connection state
type ConnectionObject = {
  isConnected?: number;
};

// Initialize the connection object
const connection: ConnectionObject = {};

// Asynchronous function to connect to the MongoDB database
async function dbConnect(): Promise<void> {
  // Check if the database is already connected
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    // Update the connection object with the connection state
    connection.isConnected = db.connections[0].readyState;
    
    console.log("Database connection successfully");
  } catch (error) {
    // Log an error message and exit the process if the connection fails
    console.log("database connection failed");
    process.exit(1);
  }
}

// Export the dbConnect function as the default export
export default dbConnect;
