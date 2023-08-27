import http from "http";
import app from "./src/app";
import request from "supertest";
const { TEST_PORT } = process.env;
import db from "./src/database/postgres/models";

declare global {
	namespace NodeJS {
		interface Global {
			login(): Promise<string[]>;
		}
	}
}

jest.setTimeout(30000);
const server = http.createServer(app);
beforeAll(done => {
	db.sequelize
		.sync({ force: true })
		.then(() => {
			// app.listen(TEST_PORT, () => {
			// 	console.log(`Application started on port: ${TEST_PORT}`);
			done();
			// });
		})
		.catch(e => console.log(`Failed to connect to database:, ${e.message}`));
});
afterAll(() => {
	server.close();
});

global.login = async () => {
	const email = "a@g.com";
	const password = "12345678";

	console.log(" I was called Login");

	const response = await request(app)
		.post("/v1/users/login")
		.send({
			email,
			password
		})
		.expect(200);

	const cookie = response.get("Set-Cookie");

	return cookie;
};
