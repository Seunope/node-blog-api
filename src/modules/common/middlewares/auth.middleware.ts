import jwt from "jsonwebtoken";
import { createError } from "./error.middleware";
import { NextFunction, Response } from "express";
import { TokenData, AuthenticatedRequest } from "../../../types";

declare global {
	namespace Express {
		interface Request {
			user: any;
		}
	}
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const Authorization = req.header("authorization")?.split("Bearer ")[1] || null;
		if (Authorization) {
			const secretKey: string = process.env.JWT_KEY || "no key";
			const tokenData = jwt.verify(Authorization, secretKey) as TokenData;

			if (tokenData.userId) {
				req.user = tokenData;
				next();
			} else {
				next(createError("Wrong authentication token", 401));
			}
		} else {
			next(createError("Authentication token missing", 404));
		}
	} catch (error) {
		next(createError("Session expired!", 401));
	}
};
