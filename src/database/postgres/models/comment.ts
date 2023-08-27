import { Comment, ExcludedAttribs, User } from "../../../types";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { PaginateOptions, PaginationConnection, makePaginate } from "sequelize-cursor-pagination";

interface CommentCreationAttributes extends Optional<Comment, ExcludedAttribs> {}

export class CommentModel extends Model<Comment, CommentCreationAttributes> implements Comment {
	declare id?: string;
	declare postId: string;
	declare userId: string;
	declare content: string;
	declare createdAt?: string;
	declare updatedAt?: string;
	declare deletedAt?: string;

	declare static paginate: (options: PaginateOptions<CommentModel>) => Promise<PaginationConnection<CommentModel>>;

	declare user?: User;
	static associate(models) {
		CommentModel.belongsTo(models.users, {
			foreignKey: "userId",
			as: "user"
		});
	}
}

export default function (sequelize: Sequelize): typeof CommentModel {
	CommentModel.init(
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
			content: {
				type: DataTypes.STRING
			},
			userId: {
				allowNull: false,
				type: DataTypes.UUID
			},
			postId: {
				allowNull: false,
				type: DataTypes.UUID
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
			modelName: "Comment",
			tableName: "comments",
			sequelize,
			paranoid: true,
			updatedAt: true,
			deletedAt: true,
			indexes: [{ unique: true, fields: ["id", "userId", "postId"] }]
		}
	);

	CommentModel.paginate = makePaginate(CommentModel);

	return CommentModel;
}
