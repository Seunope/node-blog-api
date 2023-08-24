import { Request } from "express";
import { ModelCtor } from "sequelize";

// interface User {
// 	id?: string;
// 	name: string;
// 	email: string;
// 	phone: string;
// 	password: string;
// 	createdAt?: string;
// 	updatedAt?: string;
// 	deletedAt?: string;
// }
type ExcludedAttribs = "id" | "idx" | "createdAt" | "updatedAt" | "deletedAt";
type MaritalStatus = "single" | "married" | "widowed" | "divorced";

interface DefaultAttribs {
	id?: string;
	idx?: number;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}

interface Test extends DefaultAttribs {
	id?: string;
	idx?: number;
	otp?: string;
	dob?: string;
	code?: string;
	image?: string;
	email: string;
	state: string;
	gender?: string;
	password: string;
	lastName: string;
	lastLogin?: Date;
	firstName: string;
	blockedBy?: string;
	phoneNumber: string;
	otherNames?: string;
	maritalStatus?: MaritalStatus;
}

type Models = {
	[key: string]: ModelCtor<any>;
};

type CreateErr = (message: string, code?: number, validations?: object) => Error;

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
