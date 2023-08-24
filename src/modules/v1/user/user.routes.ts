import { Router } from "express";
import { signupRules, loginRules } from "./user.validation";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { loginAccount, createAccount, refreshToken, userData } from "./user.controller";
import { validationMiddleware } from "../../common/middlewares/validation.middleware";

const userRoute = Router();

userRoute.post("/", signupRules, validationMiddleware, createAccount);
userRoute.get("/", authMiddleware, validationMiddleware, userData);
userRoute.post("/login", loginRules, validationMiddleware, loginAccount);
userRoute.get("/refresh-token", authMiddleware, validationMiddleware, refreshToken);

export default userRoute;
