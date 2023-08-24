import app from "./app";
import { logger } from "./logger";
const { PORT, SERVICE_NAME } = process.env;
// import kafka from "./services/kafka/kafka";
import db from "./database/postgres/models";

const start = async () => {
	// kafka().catch(e => logger.error(e));

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
