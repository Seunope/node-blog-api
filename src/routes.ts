import { Router } from "express";
import v1 from "./modules/v1";

const router = Router();

// Controllers
router.use("/v1", v1);

// route arrangement not working as expected
// router.use("/", async (req, res, next) => {
// 	return res.render("index.html", { serviceName: process.env.SERVICE_NAME });
// });

router.use("*", async (req, res, next) => {
	return res.send(`Url not found on ${process.env.SERVICE_NAME}`);
});
export default router;
