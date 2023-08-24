import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import v1 from "./modules/v1";

import doc from "./swagger";

const router = Router();

// Controllers
router.use("/docs", swaggerUI.serve, swaggerUI.setup(doc));
router.use("/v1", v1);

// route arrangement not working as expected
// router.use("/", async (req, res, next) => {
// 	return res.render("index.html", { serviceName: process.env.SERVICE_NAME });
// });

router.use("*", async (req, res, next) => {
	return res.send(`Url not found on ${process.env.SERVICE_NAME}`);
});
export default router;
