import { Response } from "express";
import { logger } from "../../../logger";
import { AppError } from "../../../types";
import { ValidationError, EmptyResultError } from "sequelize";

export function errorHandler(error: AppError, req: any, res: Response, _next: any) {
	try {
		if (error.validations) {
			return res.status(422).json({
				status: false,
				message: "All fields are required",
				data: error.validations
			});
		}

		let code = error.code;
		let msg = error.message;

		if (!code) {
			if (error instanceof ValidationError) {
				code = 422;
			} else if (error instanceof EmptyResultError) {
				code = 404;
				msg = "The resource requested was not found";
			} else {
				code = 500;
				msg = error.message || "Exception 500! Operation failed.";
			}
		}

		// eslint-disable-next-line no-console
		// console.log(error.name || "Error :", error.message, "\n", error.stack);
		logger.error(`${error.name} || "Error :", ${error.message} \n ${error.stack}`);

		if (req.transaction) {
			// captureException(error);
			req.transaction.finish();
		}
		return res.status(code || 500).json({ status: false, message: msg });
	} catch (e) {
		return res.status(500).json({ status: false, message: "Internal Server error" });
	}
}

export function onSuccess(msg: string, data: any) {
	return {
		data,
		status: true,
		message: msg
	};
}

export function createError(message: string, code = 403, validations: any = null): Error {
	const err = new Error(message);
	// @ts-ignore
	err.code = code;
	err.message = message;
	// @ts-ignore
	err.validations = validations;
	logger.error(`${code}, ${err.stack}`);
	return err;
}
