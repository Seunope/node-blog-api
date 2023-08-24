"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable(
			"tests",
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
				idx: {
					unique: true,
					primaryKey: true,
					autoIncrement: true,
					type: Sequelize.BIGINT
				},
				accountNumber: {
					type: Sequelize.STRING
				},
				firstName: {
					type: Sequelize.STRING,
					allowNull: true
				},
				lastName: {
					type: Sequelize.STRING,
					allowNull: true
				},
				otherNames: {
					type: Sequelize.STRING,
					allowNull: true
				},
				dob: {
					type: Sequelize.DATE,
					allowNull: true
				},
				lastLogin: {
					type: Sequelize.DATE,
					allowNull: true
				},
				maritalStatus: {
					type: Sequelize.STRING,
					allowNull: true
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				phoneNumber: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				homeAddress: {
					type: Sequelize.STRING,
					allowNull: true
				},
				gender: {
					type: Sequelize.STRING,
					allowNull: true
				},
				state: {
					type: Sequelize.STRING,
					allowNull: true
				},
				otp: {
					type: Sequelize.STRING,
					allowNull: true
				},
				profileComplete: {
					type: Sequelize.BOOLEAN,
					allowNull: true
				},
				blockedBy: {
					type: Sequelize.STRING,
					allowNull: true
				},
				image: {
					type: Sequelize.STRING,
					allowNull: true
				},
				loanPreQualification: {
					type: Sequelize.STRING,
					allowNull: true
				},
				password: {
					type: Sequelize.STRING,
					allowNull: true
				},
				pin: {
					type: Sequelize.STRING,
					allowNull: true
				},
				businessId: {
					type: Sequelize.STRING,
					allowNull: true
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
				indexes: [
					{ unique: true, fields: ["id", "idx", "phoneNumber", "email"] }
				]
			}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("tests");
	}
};
