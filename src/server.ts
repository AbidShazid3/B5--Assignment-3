import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let server: Server;
const port = 5000;

const mongoUri = process.env.MONGO_URI as string;

async function main() {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(port, () => {
            console.log(`App is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main();