import { Op } from "sequelize";
import { isEmpty } from "lodash";
import { Post } from "../../../types";
import db from "../../../database/postgres/models";
import { createError } from "../../common/middlewares/error.middleware";

const { posts } = db;

class Posts {
	private model = db.posts;

	private id: string;
	private userId: string;
	private title: string;

	constructor(id = "", userId = "", title = "") {
		this.id = id;
		this.title = title;
		this.userId = userId;
	}

	public async create(params: Partial<Post>) {
		const exist = await this.findOne().catch(e => {
			throw e;
		});
		if (exist) throw createError("You already made this post", 400);
		const result = await posts.create(params).catch(e => {
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
					...(this.title && { content: this.title })
				}
			})
			.catch(e => {
				throw e;
			});

		return result;
	}

	public async updateOne(params: Partial<Post>) {
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

	public getPost(p: Post) {
		if (p) {
			return {
				id: p.id,
				tags: p.tags,
				views: p.views,
				title: p.title,
				content: p.content,
				createdAt: p.createdAt
			};
		}
	}
}

export default Posts;
