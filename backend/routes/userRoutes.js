import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/profile',protect,getProfile);


export default userRoutes;