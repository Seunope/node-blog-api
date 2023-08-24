import request from "supertest";
import app from "../../../../app";

describe("TEST SUITE FOR CUSTOMER", () => {
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

	// it("Sign up success", done => {
	// 	var input = {
	// 		firstName: "Opeoluwas",
	// 		lastName: "mesonorale",
	// 		email: "aaa@g.com",
	// 		phoneNumber: "07055829539",
	// 		password: "12345678"
	// 	};
	// 	request(app)
	// 		.post("/v1/customer/signup")
	// 		.send(input)
	// 		.then(response => {
	// 			expect(response.statusCode).toBe(200);
	// 			done();
	// 		})
	// 		.catch(error => {
	// 			console.log("error - ");
	// 			console.log(error);
	// 		});
	// });
});
