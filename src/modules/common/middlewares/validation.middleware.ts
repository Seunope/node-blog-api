import { NextFunction, Response } from "express";
import { createError } from "./error.middleware";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../../../types";

export function validationMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			return next();
		}

		const extractedErrors = errors.array({ onlyFirstError: true });

		throw createError("Validation failed. Please ensure you fill all field correctly", 400, extractedErrors);
	} catch (e) {
		return next(e);
	}
}

export default validationMiddleware;
