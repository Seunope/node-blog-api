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
				title: {
					type: Sequelize.STRING
				},
				content: {
					type: Sequelize.STRING
				},
				tags: {
					type: Sequelize.JSON
				},
				userId: {
					allowNull: false,
					type: Sequelize.UUID
				},
				views: {
					type: Sequelize.INTEGER,
					defaultValue: 0
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
				indexes: [{ unique: true, fields: ["id", "userId"] }]
			}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("posts");
	}
};
