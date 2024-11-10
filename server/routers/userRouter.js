import { Router } from "express";
import { postLogin, postRegistration } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register', postRegistration);
userRouter.post('/login', postLogin); 

export default userRouter;