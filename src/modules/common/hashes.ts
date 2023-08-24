import bcrypt from "bcrypt";
import { createHash } from "crypto";

export const hash = (input: string): string => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(input, salt);
	return hash;
};

export const decrypt = (params: { input: string; record: string }) => {
	const decrypt = bcrypt.compareSync(params.input, params.record);
	return decrypt;
};

export const createSha512Hash = (value: string) => {
	const Hash = createHash("sha512");
	return Hash.update(value, "utf-8").digest("hex");
};
