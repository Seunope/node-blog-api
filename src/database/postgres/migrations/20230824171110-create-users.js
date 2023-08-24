"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable(
			"users",
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
				name: {
					allowNull: false,
					type: Sequelize.STRING
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				gender: {
					allowNull: false,
					type: Sequelize.ENUM("male", "female")
				},
				image: {
					type: Sequelize.STRING,
					allowNull: true
				},
				lastLogin: {
					type: Sequelize.DATE,
					allowNull: true
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false
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
				indexes: [{ unique: true, fields: ["id"] }]
			}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("users");
	}
};
