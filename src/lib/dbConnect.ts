import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {}

async function dbConnect(): Promise<void>{
     if (connection.isConnected) {
        console.log('Database already connected');
        return;
     }
     try {
       const db = await mongoose.connect(process.env.MONGODB_URI || '')

       console.log('main database', db)
      connection.isConnected = db.connections[0].readyState

 console.log('database connection', db.connections);
 console.log('Database connection successfully');
     } catch (error) {
        console.log('database connection failed');
        process.exit(1)
     }
}

export default dbConnect;