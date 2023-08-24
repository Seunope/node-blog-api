import { Models, User, Customer, ExcludedAttribs } from "../../../types";
import { Model, Sequelize, DataTypes, Optional } from "sequelize";

interface CustomerCreationAttributes extends Optional<Customer, ExcludedAttribs> {}

interface CustomerInstance extends Model<Customer, CustomerCreationAttributes>, Customer {}

export default function CustomerModel(sequelize: Sequelize) {
	const test = sequelize.define<CustomerInstance>(
		"tests",
		{
			id: {
				unique: true,
				primaryKey: true,
				onDelete: "CASCADE",
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				validate: {
					isUUID: {
						args: 4,
						msg: "id must be uuid"
					}
				}
			},
			idx: {
				unique: true,
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
			deletedAt: {
				type: DataTypes.STRING
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			}
		},
		{
			paranoid: true,
			timestamps: true,
			createdAt: true,
			updatedAt: true,
			indexes: [{ unique: true, fields: ["id", "idx", "phoneNumber", "email"] }]
		}
	);

	return test;
}
