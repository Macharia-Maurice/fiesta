import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    // If a connection already exists, return it
    if (cached.conn) {
        console.log('Using existing database connection');
        return cached.conn;
    }

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');


    // If no promise exists, create a new connection promise
    if (!cached.promise) {
        console.log('Attempting to connect to the database...');
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'fiesta',
            bufferCommands: false,
        });
    }

    try {
        // Wait for the connection to complete
        cached.conn = await cached.promise;
        console.log('Database connection successful');
        return cached.conn;
    } catch (error: any) {
        console.error('Database connection error:', error);
        throw new Error(`Failed to connect to the database: ${error.message}`);
    }
}