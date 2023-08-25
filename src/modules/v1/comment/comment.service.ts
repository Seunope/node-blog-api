import { Op } from "sequelize";
import { isEmpty } from "lodash";
import { Comment } from "../../../types";
import db from "../../../database/postgres/models";
import { createError } from "../../common/middlewares/error.middleware";

const { comments } = db;

class Comments {
	private model = db.comments;

	private id: string;
	private userId: string;
	private postId: string;
	private content: string;

	constructor(id = "", userId = "", postId = "", content = "") {
		this.id = id;
		this.postId = postId;
		this.userId = userId;
		this.content = content;
	}

	public async create(params: Partial<Comment>) {
		const exist = await this.findOne().catch(e => {
			throw e;
		});
		if (exist) throw createError("You already made this comment", 400);
		const result = await comments.create(params).catch(e => {
			throw e;
		});
		return result;
	}

	public async findOne() {
		const result = await this.model
			.findOne({
				where: {
					...(this.id && { id: this.id }),
					...(this.userId && { userId: this.userId }),
					...(this.postId && { postId: this.postId }),
					...(this.content && { content: this.content })
				}
			})
			.catch(e => {
				throw e;
			});

		return result;
	}

	public async updateOne(params: Partial<Comment>) {
		const result = await this.findOne().catch(e => {
			throw e;
		});
		if (!result) throw createError("Cannot update invalid data", 400);

		result.update(params).catch(e => {
			throw e;
		});

		return result;
	}

	public async deleteOne() {
		const result = await this.findOne().catch(e => {
			throw e;
		});
		if (!result) throw createError("Cannot delete invalid data", 400);

		result.destroy().catch(e => {
			throw e;
		});
		return result;
	}

	public async findAll(limit = 10) {
		const results = await this.model
			.findAll({
				order: [[`createdAt`, "DESC"]],
				limit,
				attributes: { exclude: ["updatedAt", "deletedAt"] }
			})
			.catch(e => {
				throw e;
			});

		return results;
	}

	public async findAllPaginated({ limit = 10, after = "", before = "", order, where }) {
		return await this.model.paginate({
			where,
			limit,
			after,
			before,
			order: !isEmpty(order) ? [[`${order.sortBy}`, `${order.sortIn}`]] : [[`createdAt`, `DESC`]] //ASC
		});
	}

	public getComment(c: Comment) {
		if (c) {
			return {
				id: c.id,
				postId: c.postId,
				userId: c.userId,
				content: c.content,
				createdAt: c.createdAt
			};
		}
	}
}

export default Comments;
