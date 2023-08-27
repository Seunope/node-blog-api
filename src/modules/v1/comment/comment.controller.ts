import Comments from "./comment.service";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../../types";
import { onSuccess, createError } from "../../common/middlewares/error.middleware";

export const createComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const {
			user: { userId },
			params: { postId },
			body: { content }
		} = req;

		const commentCheck = await new Comments("", userId, postId, content).findOne().catch(e => {
			// console.log("DDDD", e);
			throw createError("Strange event happened while adding your comment", 500);
		});

		if (commentCheck) {
			throw createError("Whoops! You have already added this comment to the post", 400);
		}

		const comment = await new Comments("", userId, postId, content).create({
			userId,
			postId,
			content
		});

		return res.status(200).json(onSuccess("Comment added successfully", { ...new Comments().getComment(comment) }));
	} catch (error) {
		next(error);
	}
};
