import { Router } from "express";
import { signupRules, loginRules } from "./user.validation";
import { createPost, userPosts } from "../post/post.controller";
import { createPostRules, getPostRules } from "../post/post.validation";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { loginAccount, createAccount, refreshToken, appUsers } from "./user.controller";
import { validationMiddleware } from "../../common/middlewares/validation.middleware";

const userRoute = Router();

userRoute.post("/", signupRules, validationMiddleware, createAccount);
userRoute.get("/", authMiddleware, validationMiddleware, appUsers);
userRoute.post("/login", loginRules, validationMiddleware, loginAccount);
userRoute.get("/refresh-token", authMiddleware, validationMiddleware, refreshToken);

userRoute.get("/:userId/posts", authMiddleware, validationMiddleware, getPostRules, validationMiddleware, userPosts);
userRoute.post("/:userId/posts", authMiddleware, validationMiddleware, createPostRules, validationMiddleware, createPost);

export default userRoute;
