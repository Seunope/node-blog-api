import Posts from "./post.service";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../../types";
import { onSuccess, createError } from "../../common/middlewares/error.middleware";
import { handlePagination, handlePaginationRequest } from "../../common/utils";

export const createPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const {
			params: { userId },
			body: { title, content, tags }
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

		return res.status(200).json(onSuccess("Post created successfully", { ...new Posts().getPost(post) }));
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
