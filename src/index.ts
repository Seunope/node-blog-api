import app from "./app";
import { logger } from "./logger";
const { PORT, SERVICE_NAME } = process.env;
import db from "./database/postgres/models";

const start = async () => {
	db.sequelize
		.authenticate()
		.then(() => {
			app.listen(PORT, () => {
				logger.info(`========================================`);
				logger.info(` ${SERVICE_NAME} app started on port:😊${PORT}`);
				logger.info(`========================================`);
			});
		})
		.catch(e => logger.info(`Failed to connect to database:, ${e.message}`));
};

start();
