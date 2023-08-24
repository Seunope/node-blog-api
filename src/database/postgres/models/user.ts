import { Gender, User, ExcludedAttribs } from "../../../types";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { PaginateOptions, PaginationConnection, makePaginate } from "sequelize-cursor-pagination";

interface UserCreationAttributes extends Optional<User, ExcludedAttribs> {}

export class UserModel extends Model<User, UserCreationAttributes> implements User {
	declare id?: string;
	declare name: string;
	declare image?: string;
	declare email: string;
	declare gender: Gender;
	declare lastLogin: string;
	declare password: string;
	declare createdAt?: string;
	declare updatedAt?: string;
	declare deletedAt?: string;
	declare static paginate: (options: PaginateOptions<UserModel>) => Promise<PaginationConnection<UserModel>>;
}

export default function (sequelize: Sequelize): typeof UserModel {
	UserModel.init(
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
			name: {
				allowNull: false,
				type: DataTypes.STRING
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			gender: {
				allowNull: false,
				type: DataTypes.ENUM("male", "female")
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true
			},
			lastLogin: {
				type: DataTypes.DATE,
				allowNull: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
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
			modelName: "User",
			tableName: "users",
			sequelize,
			paranoid: true,
			updatedAt: true,
			deletedAt: true,
			indexes: [{ unique: true, fields: ["id"] }]
		}
	);

	UserModel.paginate = makePaginate(UserModel);

	return UserModel;
}
