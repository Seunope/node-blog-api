import { ExcludedAttribs } from "@massteck/common-gpy";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

import { Test, MaritalStatus } from "../../../types";
import { PaginateOptions, PaginationConnection, makePaginate } from "sequelize-cursor-pagination";

interface TestCreationAttributes extends Optional<Test, ExcludedAttribs> {}

export class TestModel extends Model<Test, TestCreationAttributes> implements Test {
	id?: string;
	idx?: number;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
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
	declare static paginate: (options: PaginateOptions<TestModel>) => Promise<PaginationConnection<TestModel>>;
}

export default function (sequelize: Sequelize): typeof TestModel {
	TestModel.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: {
					// @ts-ignore
					args: true,
					msg: "id already exists"
				},
				validate: {
					isUUID: {
						args: 4,
						msg: "id must be uuid"
					}
				}
			},
			idx: {
				unique: true,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.BIGINT
			},
			accountNumber: {
				type: DataTypes.STRING
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: true
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: true
			},
			otherNames: {
				type: DataTypes.STRING,
				allowNull: true
			},
			dob: {
				type: DataTypes.STRING,
				allowNull: true
			},
			lastLogin: {
				type: DataTypes.DATE,
				allowNull: true
			},
			maritalStatus: {
				type: DataTypes.STRING,
				allowNull: true
			},
			email: {
				unique: true,
				allowNull: false,
				type: DataTypes.STRING
			},
			phoneNumber: {
				unique: true,
				allowNull: false,
				type: DataTypes.STRING
			},
			homeAddress: {
				type: DataTypes.STRING,
				allowNull: true
			},
			gender: {
				type: DataTypes.STRING,
				allowNull: true
			},
			state: {
				type: DataTypes.STRING,
				allowNull: true
			},
			otp: {
				type: DataTypes.STRING,
				allowNull: true
			},
			profileComplete: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: true
			},

			blockedBy: {
				type: DataTypes.STRING,
				allowNull: true
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true
			},
			loanPreQualification: {
				type: DataTypes.JSON,
				allowNull: true
			},
			businessId: {
				type: DataTypes.STRING,
				allowNull: true
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			deletedAt: {
				type: DataTypes.DATE
			}
		},
		{
			modelName: "Test",
			tableName: "tests",
			sequelize,
			paranoid: true,
			updatedAt: true,
			deletedAt: true,
			indexes: [{ unique: true, fields: ["id", "idx"] }]
		}
	);

	TestModel.paginate = makePaginate(TestModel);

	return TestModel;
}
