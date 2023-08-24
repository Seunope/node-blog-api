import { boolean, string, object } from "../../../swaggerTypes";

export default {
	"v1/customer": {
		post: {
			tags: ["Customers"],
			summary: "Create a new account",
			description: "Create a new account",
			requestBody: {
				Content: "application/json"
			},
			parameters: [
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							firstName: string,
							lastName: string,
							email: string,
							phoneNumber: string,
							password: string
						}
					}
				}
			],
			responses: {
				200: {
					description: "Successful",
					schema: {
						type: "object",
						properties: {
							status: boolean,
							message: string,
							data: {
								type: "object",
								properties: {
									id: string,
									firstName: string,
									lastName: string,
									otherNames: string,
									lastLogin: string,
									maritalStatus: string,
									email: string,
									phoneNumber: string,
									homeAddress: string,
									state: string,
									gender: string,
									profileComplete: boolean,
									image: string
								}
							}
						}
					}
				},
				400: {
					description: "Failed",
					schema: {
						type: "object",
						properties: {
							status: false,
							message: string,
							data: null
						}
					}
				}
			}
		}
	}
};
