"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable(
			"posts",
			{
				id: {
					unique: true,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					validate: {
						isUUID: {
							args: 4,
							msg: "id must be uuid"
						}
					}
				},
				content: {
					type: Sequelize.STRING
				},
				userId: {
					allowNull: false,
					type: Sequelize.UUID
				},
				postId: {
					allowNull: false,
					type: Sequelize.UUID
				},
				deletedAt: {
					type: Sequelize.DATE
				},
				createdAt: {
					type: Sequelize.DATE
				},
				updatedAt: {
					type: Sequelize.DATE
				}
			},
			{
				paranoid: true,
				timestamps: true,
				createdAt: true,
				updatedAt: true,
				indexes: [{ unique: true, fields: ["id", "userId", "postId"] }]
			}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("posts");
	}
};
