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
	lastLogin: string;
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
