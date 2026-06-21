
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try{
        //   console.log('MONGODB_URL=', process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL)
        // console.log('MONGODB_URL=', process.env.MONGODB_URL);
        console.log("MongoDB connnected successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
export default connectDB;