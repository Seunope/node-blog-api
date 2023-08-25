import { Router } from "express";
import { signupRules, loginRules } from "./post.validation";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { loginAccount, createAccount, refreshToken, userData } from "./post.controller";
import { validationMiddleware } from "../../common/middlewares/validation.middleware";

const userRoute = Router();

userRoute.post("/", signupRules, validationMiddleware, createAccount);
userRoute.get("/", authMiddleware, validationMiddleware, userData);
userRoute.post("/login", loginRules, validationMiddleware, loginAccount);
userRoute.get("/refresh-token", authMiddleware, validationMiddleware, refreshToken);

userRoute.get("/:id/posts", loginRules, validationMiddleware, loginAccount);
userRoute.post("/:id/posts", loginRules, validationMiddleware, loginAccount);

export default userRoute;
