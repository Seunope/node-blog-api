import request from "supertest";
import app from "../../../../app";

describe("Login up Test Suite", () => {
	test("Login up successful with wrong password", async () => {
		var input = {
			email: "a@g.com",
			password: "123ddddddd456"
		};
		const data = await request(app).post("/v1/users/login").send(input);
		expect(data.statusCode).toBe(400);
	});

	test("Login up successful with wrong email", async () => {
		var input = {
			email: "aa@g.com",
			password: "123456"
		};
		const data = await request(app).post("/v1/users/login").send(input);
		expect(data.statusCode).toBe(400);
	});

	// test("Login up successful", async () => {
	// 	var input = {
	// 		email: "a@g.com",
	// 		password: "12345678"
	// 	};
	// 	const data = await request(app).post("/v1/users/login").send(input);
	// 	expect(data.statusCode).toBe(200);
	// });
});
