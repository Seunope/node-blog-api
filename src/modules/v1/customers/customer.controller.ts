import { Request, Response, NextFunction } from "express";
import { onSuccess, createError } from "@massteck/common-gpy";

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(onSuccess("Account created successfully", { data: "{}" }));
	} catch (error) {
		next(error);
	}
};
