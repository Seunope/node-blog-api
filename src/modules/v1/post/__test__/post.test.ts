import request from "supertest";
import app from "../../../../app";

describe("Post Test Suite", () => {
	test("Retrieve top 3 users post", async () => {
		try {
			const data = await request(app).get("/v1/posts/top3");
			expect(data.statusCode).toBe(200);
		} catch (error) {
			console.log(error);
		}
	});

	test("Retrieve top 3 optimize users post", async () => {
		try {
			const data = await request(app).get("/v1/posts/top3-optimized");
			expect(data.statusCode).toBe(200);
		} catch (error) {
			console.log(error);
		}
	});

	// test("Create post was successful", async () => {
	// 	const cookie = await global.login();

	// 	console.log("I wash eerr");
	// 	console.log("KKKKKKKKKK", cookie);

	// 	var input = {
	// 		title: "My first post",
	// 		content:
	// 			"The reason against using dotenv is that values in process.env are meant to be different in different deployments, which are set by the environment, not by you. If a variable doesn't change in different environments, then it's not an environmental variable, it's just a global variable that you set manually. The dotenv doc further points to the 12 factor app which is a good read."
	// 	};
	// 	const data = await request(app).post("/v1/users/0174e39a-33be-4872-86bd-00b997af11aa/post").send(input).set("Cookie", cookie);
	// 	expect(data.statusCode).toBe(200);
	// });
});
