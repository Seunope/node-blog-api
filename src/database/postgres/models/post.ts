import { Post, ExcludedAttribs } from "../../../types";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { PaginateOptions, PaginationConnection, makePaginate } from "sequelize-cursor-pagination";

interface PostCreationAttributes extends Optional<Post, ExcludedAttribs> {}

export class PostModel extends Model<Post, PostCreationAttributes> implements Post {
	declare id?: string;
	declare title: string;
	declare views: number;
	declare tags: string[];
	declare userId: string;
	declare content: string;
	declare createdAt?: string;
	declare updatedAt?: string;
	declare deletedAt?: string;
	declare static paginate: (options: PaginateOptions<PostModel>) => Promise<PaginationConnection<PostModel>>;
}

export default function (sequelize: Sequelize): typeof PostModel {
	PostModel.init(
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
			title: {
				type: DataTypes.STRING
			},
			content: {
				type: DataTypes.STRING
			},
			tags: {
				type: DataTypes.JSON
			},
			userId: {
				allowNull: false,
				type: DataTypes.UUID
			},
			views: {
				type: DataTypes.INTEGER,
				defaultValue: 0
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
			modelName: "Post",
			tableName: "posts",
			sequelize,
			paranoid: true,
			updatedAt: true,
			deletedAt: true,
			indexes: [{ unique: true, fields: ["id", "userId"] }]
		}
	);

	PostModel.paginate = makePaginate(PostModel);

	return PostModel;
}
