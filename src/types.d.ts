import { Request } from "express";
import { ModelCtor } from "sequelize";

type Gender = "male" | "female";
type ExcludedAttribs = "id" | "createdAt" | "updatedAt" | "deletedAt";
type CreateErr = (message: string, code?: number, validations?: object) => Error;

type Models = {
	[key: string]: ModelCtor<any>;
};

type AuthenticatedRequest = Request & {
	user: User;
	destination?: {
		method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
		url: string;
	};
};

export type TokenTime =
	| "1 minutes"
	| "3 minutes"
	| "5 minutes"
	| "10 minutes"
	| "15 minutes"
	| "30 minutes"
	| "1 hour"
	| "1 day"
	| "3 days"
	| "7 days";

export interface TokenData {
	name: string;
	email: string;
	userId: string;
	expiresIn: string;
}

type AppError = Error & {
	code: number;
	name?: string;
	message: string;
	validations?: object | null;
};

interface DefaultAttribs {
	id?: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}

interface User extends DefaultAttribs {
	name: string;
	image?: string;
	email: string;
	gender: Gender;
	lastLogin: Date;
	password: string;
}

interface Post extends DefaultAttribs {
	title: string;
	views: number;
	tags: string[];
	userId: string;
	content: string;
}

interface Comment extends DefaultAttribs {
	postId: string;
	userId: string;
	content: string;
}
