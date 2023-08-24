import { Op } from "sequelize";
import db from "../../../database/postgres/models";
import { createError, Customer } from "@massteck/common-gpy";

const { tests } = db;

class Customers {
	private model = db.tests;

	private id: string;

	private email: string;

	private phoneNumber: string;

	constructor(phoneNumber = "", customerId = "", email = "") {
		this.email = email;
		this.id = customerId;
		this.phoneNumber = phoneNumber;
	}

	public async createAccount(params: Customer) {
		const exist = await this.findOne().catch(e => {
			throw e;
		});
		if (exist) throw createError("You already have an account", 400);
		const customer = await tests.create(params).catch(e => {
			throw e;
		});
		return customer;
	}

	public async findOne() {
		const customer = await this.model
			.findOne({
				where: {
					...(this.id && { id: this.id }),
					...(this.email && { email: this.email }),
					...(this.phoneNumber && { phoneNumber: this.phoneNumber })
				}
			})
			.catch(e => {
				throw e;
			});

		return customer;
	}

	public async updateOne(params: Partial<Customer>) {
		const customer = await this.findOne().catch(e => {
			throw e;
		});
		if (!customer) throw createError("Cannot update invalid customer account", 400);

		customer.update(params).catch(e => {
			throw e;
		});

		return customer;
	}

	public async upD(params: Partial<Customer>) {
		const customer = await this.findOne().catch(e => {
			throw e;
		});
		if (!customer) throw createError("Cannot update invalid customer account", 400);

		customer.update(params).catch(e => {
			throw e;
		});

		return customer;
	}

	public async deleteOne() {
		const customer = await this.findOne().catch(e => {
			throw e;
		});
		if (!customer) throw createError("Cannot delete invalid customer account", 400);

		customer.destroy().catch(e => {
			throw e;
		});
		return customer;
	}

	public async findAll(newIdx = 1, limit = 10) {
		const customers = await this.model
			.findAll({
				order: [["idx", "DESC"]],
				limit,
				where: {
					idx: {
						[Op.gte]: newIdx
					}
				},
				attributes: { exclude: ["updatedAt", "deletedAt"] }
			})
			.catch(e => {
				throw e;
			});

		return customers;
	}

	public getCustomer(c: Customer) {
		if (c) {
			return {
				id: c.id,
				dob: c.dob,
				email: c.email,
				state: c.state,
				image: c.image,
				gender: c.gender,
				lastName: c.lastName,
				firstName: c.firstName,
				blockedBy: c.blockedBy,
				lastLogin: c.lastLogin,
				otherNames: c.otherNames,
				businessId: c.businessId,
				phoneNumber: c.phoneNumber,
				homeAddress: c.homeAddress,
				profileComplete: c.profileComplete
			};
		}
	}
}

export default Customers;
