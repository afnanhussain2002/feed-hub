

type connectionObject ={
    isConnected:number
}

const connection : connectionObject = {}

async function dbConnect(): Promise<void>{
     if (connection.isConnected) {
        console.log('Database already connected');
        return;
     }
}

export default dbConnect;