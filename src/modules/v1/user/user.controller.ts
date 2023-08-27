import Users from "./user.service";
import { decrypt, hash } from "../../common/hashes";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, TokenData } from "../../../types";
import AuthenticationService from "../authentication/authenticate.service";
import { onSuccess, createError } from "../../common/middlewares/error.middleware";
import { handlePaginationRequest, handlePagination } from "../../common/utils";

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, gender, password } = req.body;

		const userCheck = await new Users("", email).findOne().catch(e => {
			console.log("e", e);
			throw createError("Strange event happened while creating your account", 500);
		});

		if (userCheck) {
			throw createError("Whoops! An account already existed with this details. Proceed to login", 500);
		}

		const customer = await new Users("", email).create({
			name,
			email,
			gender,
			password: hash(password)
		});

		return res.status(200).json(onSuccess("Account created successfully", { ...new Users().getUser(customer) }));
	} catch (error) {
		next(error);
	}
};

export const loginAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await new Users("", email).findOne().catch(() => {
			throw createError("Strange event happened while logging you in. If it persist, contact support", 500);
		});

		if (!user) throw createError("Email or password not correct", 400);

		if (!decrypt({ input: password, record: user.password })) {
			throw createError("Invalid email or Password", 400);
		}

		await new Users("", email).updateOne({
			lastLogin: new Date()
		});

		// Generate JWT
		const expiresIn = process.env.TOKEN_EXPIRES;
		const data = {
			expiresIn,
			userId: user.id,
			name: user.name,
			email: user.email
		} as TokenData;

		const token = new AuthenticationService(req, "3 days").generateToken(data);
		res.cookie("jwt", token.refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });

		return res.status(200).json(onSuccess("Login was successful", { user: new Users().getUser(user), token }));
	} catch (error) {
		next(error);
	}
};

export const appUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const posts = await new Users().findAllPaginated(handlePaginationRequest(req.query));
		const data = handlePagination(posts, "posts");

		return res.status(200).json(onSuccess("Users retrieved", { ...data }));
	} catch (error) {
		next(error);
	}
};

export const refreshToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const token = new AuthenticationService(req, "30 minutes").refreshToken();

		return res.status(200).json(onSuccess("New token generated successfully", token));
	} catch (error) {
		next(error);
	}
};
