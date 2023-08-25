import { check, param } from "express-validator";

export const createCommentRules = [
	param("postId").notEmpty().isUUID().withMessage("Enter your user id"),
	check("content").notEmpty().isString().withMessage("Enter your post content")
];
