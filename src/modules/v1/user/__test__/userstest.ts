import request from "supertest";
import app from "../../../../app";

describe("User Test Suite", () => {
	test("Retrieve all users ", async () => {
		try {
			const data = await request(app).get("/v1/users");
			expect(data.statusCode).toBe(200);
		} catch (error) {
			console.log(error);
		}
	});
});
