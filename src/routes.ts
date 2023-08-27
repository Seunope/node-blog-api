import { Router } from "express";
import v1 from "./modules/v1";

const router = Router();

router.use("/v1", v1);

router.use("*", async (req, res, next) => {
	return res.send(`Url not found on ${process.env.SERVICE_NAME}`);
});
export default router;
