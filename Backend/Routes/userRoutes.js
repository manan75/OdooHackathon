import express from "express";
import userAuth from "../Middlewares/authMiddlewares.js";
import {getUserData} from "../Controllers/userController.js"
import { getUserNotifications } from "../Controllers/notificationController.js";


const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData)
userRouter.get('/notifs',getUserNotifications)

export default userRouter;