import axios from "axios";
import { logger } from "../../logger";
const { SERVICE_ID, KAFKA_TOPIC, SERVICE_BASE_URL, SERVICE_NAME, SERVICE_PATH } = process.env;

export const selectEventData = (serviceId: string, requestData: any) => {
	let data = {};
	switch (serviceId) {
		case "utility-service":
			data = {
				requestData,
				topic: KAFKA_TOPIC,
				name: SERVICE_NAME,
				path: SERVICE_PATH,
				serviceId: SERVICE_ID,
				target: SERVICE_BASE_URL
			};
		case "user-service":
			data = {
				requestData,

				topic: process.env.UTILITY_KAFKA_TOPIC,
				name: process.env.UTILITY_SERVICE_NAME,
				path: process.env.UTILITY_SERVICE_PATH,
				serviceId: process.env.UTILITY_SERVICE_ID,
				target: process.env.UTILITY_SERVICE_BASE_URL
			};
			break;
		case "wallet-service":
			data = {
				requestData,
				topic: process.env.WALLET_KAFKA_TOPIC,
				name: process.env.WALLET_SERVICE_NAME,
				path: process.env.WALLET_SERVICE_PATH,
				serviceId: process.env.WALLET_SERVICE_ID,
				target: process.env.WALLET_SERVICE_BASE_URL
			};
			break;
		default:
			break;
	}

	return data;
};

export const processEventData = async (eventData: any) => {
	let axiosInstance: any;
	const inputData = JSON.parse(eventData);
	const { requestData, target, path } = inputData.data;
	if (requestData.isAuthRequire) {
		axiosInstance = axios.create({
			headers: {
				Authorization: `Bearer ${requestData.token}`
			}
		});
	} else {
		axiosInstance = axios.create({});
	}

	const makeUrl = process.env.NODE_ENV === "production" ? `${target}${path}${requestData.url}` : `${target}${requestData.url}`;
	logger.info(`KAFKA: ${JSON.stringify(requestData.body)}`);
	if (requestData.method === "GET") {
		let setParams: string;
		if (requestData) {
			for (const params in requestData) {
				if (!setParams) {
					setParams = `?${params}=${requestData[params]}`;
				} else {
					setParams = setParams + `&${params}=${requestData[params]}`;
				}
			}
		}
		await axiosInstance.get(`${makeUrl}${setParams}`).catch(err => {
			// console.log(err);
			logger.error(`KAFKA:, ${err.message}`);
		});
	} else if (requestData.method === "POST") {
		await axiosInstance.post(`${makeUrl}`, { ...requestData.body }).catch(err => {
			// console.log(err);
			logger.error(`KAFKA:, ${err.message}`);
		});
	} else if (requestData.method === "PUT") {
		await axiosInstance.put(`${makeUrl}`, { ...requestData.body }).catch(err => {
			// console.log(err);
			logger.error(`KAFKA:, ${err.message}`);
		});
	} else if (requestData.method === "DELETE") {
		await axiosInstance.delete(`${makeUrl}`, { ...requestData.body }).catch(err => {
			// console.log(err);
			logger.error(`KAFKA:, ${err.message}`);
		});
	}
};
