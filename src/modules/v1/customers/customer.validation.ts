import { check, param, query, body } from "express-validator";
import { isValidPhone } from "../../common/phoneValidator";
import { createError } from "@massteck/common-gpy";

const { NODE_ENV } = process.env;

// validate params phone number
export const validatePhoneNumber = [
	param("phoneNumber")
		.notEmpty()
		.isString()
		.customSanitizer(value => {
			const valid = isValidPhone(value);
			if (!valid.result) throw createError("Enter a valid phone number", 400);
			return `+234${valid.phoneNumber.substring(1, valid.phoneNumber.length + 1)}`;
		})
];

export const changePhoneNumberOrEmailRule = (type: "email" | "phoneNumber") => {
	if (type === "phoneNumber") {
		return [
			body("currentPhoneNumber")
				.notEmpty()
				.isString()
				.customSanitizer(value => {
					const valid = isValidPhone(value);
					if (!valid.result) throw createError("Enter a valid phone number", 400);
					return `+234${valid.phoneNumber.substring(1, valid.phoneNumber.length + 1)}`;
				}),
			body("newPhoneNumber")
				.notEmpty()
				.isString()
				.customSanitizer(value => {
					const valid = isValidPhone(value);
					if (!valid.result) throw createError("Enter a valid phone number", 400);
					return `+234${valid.phoneNumber.substring(1, valid.phoneNumber.length + 1)}`;
				})
		];
	}

	if (type === "email") {
		return [
			body("newEmail").isEmail().notEmpty().toLowerCase().withMessage("Enter a valid email"),
			body("currentEmail").isEmail().notEmpty().toLowerCase().withMessage("Enter a valid email")
		];
	}
};

// validate
export const validateSignup = [
	check("firstName").notEmpty().isString().withMessage("Enter your first name"),
	check("lastName").notEmpty().isString().withMessage("Enter your last name"),
	check("email")
		.isEmail()
		.notEmpty()
		.toLowerCase()
		.isString()
		// .customSanitizer((value) => {
		//   const checkAlias = value.split('@')[0];
		//   if (NODE_ENV === 'production' && checkAlias.includes('+')) {
		//     throw createError(
		//       'Email alias is not allowed. For example, arvo@gmail.com and arvo+alias@gmail.com are the same',
		//       400
		//     );
		//   }
		//   return value;
		// })
		.withMessage("Enter Email Address"),
	check("password")
		.isString()
		.isLength({ min: 6 })
		.customSanitizer(value => {
			if (value === "password" || value === "123456") {
				throw createError("Please enter a strong password", 400);
			}

			return value;
		})
		.withMessage("Enter your password"),
	check("phoneNumber")
		.not()
		.isEmpty()
		.customSanitizer(value => {
			const valid = isValidPhone(value);
			if (!valid.result) throw createError("Enter a valid phone number", 400);
			return `+234${valid.phoneNumber.substring(1, valid.phoneNumber.length + 1)}`;
		})
];

export const validateOTP = [check("otp").isString().notEmpty().withMessage("Enter the OTP sent to you")];

export const validateLogin = [
	check("phoneNumber")
		.notEmpty()
		.customSanitizer(value => {
			const valid = isValidPhone(value);
			if (!valid.result) throw createError("Enter a valid phone number", 400);
			return `+234${valid.phoneNumber.substring(1, valid.phoneNumber.length + 1)}`;
		}),
	check("password").notEmpty().isString().isLength({ min: 6 }).withMessage("Your password must be 6+ characters")
];

export const validateSpecifiedIds = [
	query("customerIds")
		.isString()
		.notEmpty()
		.customSanitizer(value => {
			const ids = value.split(",");
			return ids;
		})
];

export const validateOtp = [check("otp").isString().isLength({ min: 6 }).notEmpty().withMessage("Enter the OTP sent to you")];
