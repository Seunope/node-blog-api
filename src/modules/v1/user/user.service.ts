import { Op } from "sequelize";
import { isEmpty } from "lodash";
import { User } from "../../../types";
import db from "../../../database/postgres/models";
import { createError } from "../../common/middlewares/error.middleware";

const { users } = db;

class Users {
	private model = db.users;

	private id: string;
	private email: string;

	constructor(id = "", email = "") {
		this.email = email;
		this.id = id;
	}

	public async create(params: Partial<User>) {
		const exist = await this.findOne().catch(e => {
			throw e;
		});
		if (exist) throw createError("You already have an account", 400);
		const result = await users.create(params).catch(e => {
			throw e;
		});
		return result;
	}

	public async findOne() {
		const result = await this.model
			.findOne({
				where: {
					...(this.id && { id: this.id }),
					...(this.email && { email: this.email })
				}
			})
			.catch(e => {
				throw e;
			});

		return result;
	}

	public async updateOne(params: Partial<User>) {
		const result = await this.findOne().catch(e => {
			throw e;
		});
		if (!result) throw createError("Cannot update invalid result account", 400);

		result.update(params).catch(e => {
			throw e;
		});

		return result;
	}

	public async upD(params: Partial<User>) {
		const result = await this.findOne().catch(e => {
			throw e;
		});
		if (!result) throw createError("Cannot update invalid result account", 400);

		result.update(params).catch(e => {
			throw e;
		});

		return result;
	}

	public async deleteOne() {
		const result = await this.findOne().catch(e => {
			throw e;
		});
		if (!result) throw createError("Cannot delete invalid result account", 400);

		result.destroy().catch(e => {
			throw e;
		});
		return result;
	}

	public async findAll(limit = 10) {
		const results = await this.model
			.findAll({
				order: [["idx", "DESC"]],
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
			// include: [
			// 	{
			// 		model: db.loanProviders,
			// 		as: "provider",
			// 		attributes: ["businessName", "rating"]
			// 	}
			// ],
			order: !isEmpty(order) ? [[`${order.sortBy}`, `${order.sortIn}`]] : [[`createdAt`, `DESC`]] //ASC
		});
	}

	public getUser(c: User) {
		if (c) {
			return {
				id: c.id,
				name: c.name,
				email: c.email,
				image: c.image,
				gender: c.gender,
				lastLogin: c.lastLogin
			};
		}
	}
}

export default Users;
