import request from "supertest";
import app from "../../../../app";

describe("Sign up Test Suite", () => {
	it("adds 1 + 2 to equal 3", () => {
		const sum = (a, b) => a + b;
		expect(sum(1, 2)).toBe(3);
	});

	it("Test if application is running", done => {
		request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			})
			.catch(error => {
				console.log(error);
			});
	});

	it("Sign up success", done => {
		var input = {
			firstName: "Opeoluwa",
			lastName: "Mesonrale",
			gender: "male",
			email: "a@g.com",
			password: "12345678"
		};
		request(app)
			.post("/v1/users")
			.send(input)
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			})
			.catch(error => {
				console.log(error);
			});
	});
});
