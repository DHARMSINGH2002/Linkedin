import express from  "express";
import createPost, { getPost, like } from "../Controller/post.controller.js"
import isAuth from "../Middleware/isAuth.js";
import upload from "../Middleware/multer.js";
import { like ,comment} from "../Controller/post.controller.js";
const postRouter = express.Router()
postRouter.post("/create", isAuth,upload.single("image"),createPost);
postRouter.get("/getpost",isAuth,getPost);
postRouter.get("/like/:id" ,isAuth,like);
postRouter.post("/comment/:id", isAuth,comment)
export default postRouter