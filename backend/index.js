import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import authRouter from './Routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import userRouter from './Routes/user.routes.js';
import postRouter from './Routes/post.routes.js'
dotenv.config();
let port = process.env.PORT || 5000
let app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}))
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/post",postRouter);

app.listen(port, () => {
   connectDB();
   
   console.log(`Example app listening on port ${port}!`);
});