import express from "express";
let authRouter = express.Router();
import { signUp ,login ,logout } from "../Controller/auth.controller.js";
authRouter.post("/signup",signUp);
authRouter.post("/login",login);
authRouter.get("/logout",logout);
export default authRouter;