import { check } from "express-validator";
import { createError } from "../../common/middlewares/error.middleware";

export const signupRules = [
	check("name").notEmpty().isString().withMessage("Enter your  name"),
	check("email")
		.isEmail()
		.notEmpty()
		.toLowerCase()
		.isString()
		.customSanitizer(value => {
			console.log("Value", value);
			const checkAlias = value.split("@")[0];
			if (process.env.NODE_ENV === "production" && checkAlias.includes("+")) {
				throw createError("Email alias is not allowed. For example, ope@gmail.com and ope+alias@gmail.com are the same", 400);
			}
			return value;
		})
		// .normalizeEmail()
		.toLowerCase()
		.withMessage("Enter Email Address"),
	check("password")
		.isString()
		.isLength({ min: 6 })
		.customSanitizer(value => {
			if (value === "password" || value === "123456" || value === "user" || value === "1234") {
				throw createError("Your password is weak, enter a strong password", 400);
			}
			return value;
		})
		.withMessage("Enter your password"),
	check("gender")
		.not()
		.isEmpty()
		.customSanitizer(value => {
			if (value !== "male" && value !== "female") throw createError("Enter a valid gender", 400);
			return value;
		})
];

export const loginRules = [
	check("email").notEmpty().isEmail().toLowerCase().withMessage("Enter Email Address"),
	check("password").notEmpty().isString().isLength({ min: 6 }).withMessage("Your password must be 6+ characters")
];
