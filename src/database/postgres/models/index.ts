import UserModel from "./user";
import PostModel from "./post";
import CommentModel from "./comment";

import { Sequelize } from "sequelize";
import dbconfig from "../config/config";

const { NODE_ENV = "development" } = process.env;

const config = dbconfig[NODE_ENV];

let sequelize: Sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
	sequelize,
	Sequelize,
	users: UserModel(sequelize),
	posts: PostModel(sequelize),
	comments: CommentModel(sequelize)
};

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

export default db;
