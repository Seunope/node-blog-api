import { Router } from "express";
import { topUsers, topUsersOptimized } from "./post.controller";
import { createComment } from "../comment/comment.controller";
import { createCommentRules } from "../comment/comment.validation";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { validationMiddleware } from "../../common/middlewares/validation.middleware";

const postRoute = Router();

postRoute.get("/top3", authMiddleware, validationMiddleware, topUsers);
postRoute.get("/top3-optimized", authMiddleware, validationMiddleware, topUsersOptimized);
postRoute.post("/:postId/comments", authMiddleware, validationMiddleware, createCommentRules, validationMiddleware, createComment);

export default postRoute;
