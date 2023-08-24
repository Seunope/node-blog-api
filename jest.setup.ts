import http from "http";
import app from "./src/app";
const { TEST_PORT } = process.env;
import db from "./src/database/postgres/models";

jest.setTimeout(80000);
const server = http.createServer(app);
beforeAll(done => {
	db.sequelize
		.sync({ force: true, logging: console.log })
		.then(() => {
			app.listen(TEST_PORT, () => {
				console.log(`Application started on port:, ${TEST_PORT}`);
				done();
			});
		})
		.catch(e => console.log(`Failed to connect to database:, ${e.message}`));
});
afterAll(async () => {
	await server.close();
});
