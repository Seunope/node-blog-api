import { config } from "dotenv";
import customers from "./modules/v1/customers/customer.docs";

config();

const { PORT, SERVICE_BASE_URL2, SERVICE_NAME } = process.env;

const doc = {
	swagger: "2.0",
	info: {
		version: "1.0.0",
		title: `${SERVICE_NAME} API`,
		description: "An Application to manage users"
	},
	host: SERVICE_BASE_URL2 || `localhost:${PORT}`,
	basePath: "/",
	tags: [
		// {
		// 	name: "Customer",
		// 	description: "Manage App user"
		// }
	],
	schemes: ["http", "https"],
	consumes: ["application/json", "multipart/form-data"],
	produces: ["application/json", "multipart/form-data"],
	paths: {
		...customers
	},
	securityDefinitions: {
		Bearer: {
			type: "apiKey",
			in: "header",
			description: `Add token for authorization using the format Bearer (token)e.g.
        'Bearer eetelteouou1223424nkdnkdgndkg'`,
			name: "Authorization"
		}
	},
	definitions: {}
};

export default doc;
