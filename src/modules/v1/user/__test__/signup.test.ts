import request from "supertest";
import app from "../../../../app";

describe("Sign up Test Suite", () => {
	it("adds 1 + 2 to equal 3", () => {
		const sum = (a, b) => a + b;
		expect(sum(1, 2)).toBe(3);
	});

	test("Test if application is running", async () => {
		const data = await request(app).get("/");
		expect(data.statusCode).toBe(200);
	});

	test("Sign up with no email", async () => {
		const input = {
			name: "Opeoluwa",
			gender: "male",
			email: "ag.com",
			password: "12345678"
		};
		const data = await request(app).post("/v1/users").send(input);
		expect(data.statusCode).toBe(422);
	});

	test("Sign up with no password", async () => {
		const input = {
			name: "Opeoluwa",
			gender: "male",
			email: "a@g.com",
			password: ""
		};
		const data = await request(app).post("/v1/users").send(input);
		expect(data.statusCode).toBe(422);
	});

	// test("Sign up wit no password", async () => {
	// 	expect.assertions(1);
	// 	const input = {
	// 		name: "Opeoluwa",
	// 		gender: "male",
	// 		email: "a@g.com",
	// 		password: ""
	// 	};
	// 	try {
	// 		await request(app).post("/v1/users").send(input);
	// 	} catch (e) {
	// 		console.log(e);
	// 		expect(e).toMatch("error");
	// 	}
	// });

	test("Sign up success", async () => {
		const input = {
			name: "Opeoluwa",
			gender: "male",
			email: "a@g.com",
			password: "12345678"
		};
		const data = await request(app).post("/v1/users").send(input);
		expect(data.statusCode).toBe(200);
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
