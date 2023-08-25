import Users from "./comnet.service";
import { decrypt, hash } from "../../common/hashes";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, TokenData } from "../../../types";
import AuthenticationService from "../authentication/authenticate.service";
import { onSuccess, createError } from "../../common/middlewares/error.middleware";
import Posts from "./comnet.service";
import { handlePagination, handlePaginationRequest } from "../../common/utils";

export const createComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const {
			user: { userId },
			params: { postId },
			body: { content }
		} = req;

		const postCheck = await new Posts("", "", title).findOne().catch(e => {
			throw createError("Strange event happened while creating your post", 500);
		});

		if (postCheck) {
			throw createError("Whoops! You have already created a post with this title", 400);
		}

		const post = await new Posts("", userId, title).create({
			tags,
			title,
			userId,
			content
		});

		return res.status(200).json(onSuccess("Post created successfully", { ...new Users().getPost(post) }));
	} catch (error) {
		next(error);
	}
};

export const userPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const {
			params: { userId }
		} = req;

		let whereClause = req.query.where;
		whereClause["userId"] = userId;
		req.query.where = whereClause;

		const posts = await new Posts().findAllPaginated(handlePaginationRequest(req.query));
		const data = handlePagination(posts, "posts");

		return res.status(200).json(onSuccess("Action was successful", { data }));
	} catch (error) {
		next(error);
	}
};
