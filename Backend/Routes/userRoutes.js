import express from "express";
import userAuth from "../Middlewares/authMiddleware.js";
import { getUserData } from "../Controllers/userController.js";


const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData)

export default userRouter;