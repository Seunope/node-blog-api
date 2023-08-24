import { Kafka } from "kafkajs";
import { selectEventData, processEventData } from "./utils";
import { KafkaEvent, KafkaEventPacket } from "@massteck/common-gpy";

const { SERVICE_ID, KAFKA_TOPIC } = process.env;

const kafka = new Kafka({
	clientId: "groupay-app",
	brokers: ["localhost:9092"]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: `${SERVICE_ID}-group` });

export const sendKafKaEvent = async ({ type, requestData, serviceId }: KafkaEvent) => {
	const data = selectEventData(serviceId, requestData) as KafkaEventPacket;
	//console.log("DDD", data);
	await producer.send({
		topic: data.topic,
		messages: [
			{
				value: JSON.stringify({
					type,
					data
				}),
				timestamp: `${Date.now()}`
			}
		]
	});
};

export const subscribeToTopic = async (topic: string) => {
	await consumer.subscribe({ topic, fromBeginning: true });
};

const start = async () => {
	// Producing
	await producer.connect();
	await subscribeToTopic(KAFKA_TOPIC!);

	// Consuming
	await consumer.connect();
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			processEventData(message.value);
			console.log({
				topic,
				partition,
				offset: message.offset,
				value: message.value.toString()
			});
		}
	});
};

export default start;
