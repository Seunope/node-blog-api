import { check, param, query, body } from "express-validator";

export const createPostRules = [
	param("userId").notEmpty().isUUID().withMessage("Enter your user id"),
	check("title").notEmpty().isString().withMessage("Enter your post title"),
	check("content").notEmpty().isString().withMessage("Enter your post content"),
	check("tags").optional().notEmpty().isString().withMessage("Enter your tags")
];

export const getPostRules = [param("userId").notEmpty().isUUID().withMessage("Enter your user id")];
