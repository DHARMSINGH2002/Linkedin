import express from  "express";
import createPost, { getPost } from "../Controller/post.controller.js"
import isAuth from "../Middleware/isAuth.js";
import upload from "../Middleware/multer.js";
const postRouter = express.Router()
postRouter.post("/create", isAuth,upload.single("image"),createPost);
postRouter.get("/getpost",isAuth,getPost);

export default postRouter