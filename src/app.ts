import cors from "cors";
import path from "path";
import config from "config";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import { stream } from "./logger";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./modules/common/middlewares/error.middleware";

const { PORT, NODE_ENV, SERVICE_PATH = "" } = process.env;
const morganConfig = NODE_ENV === "development" ? "dev" : "tiny";

// Middlewares
const app = express();
app.disable("x-powered-by");
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");
app.set("views", path.resolve("public"));

// Middlewares
app.use(morgan(morganConfig));
app.use(morgan(config.get("log.format"), { stream }));
app.use(cors({ origin: config.get("cors.origin"), credentials: config.get("cors.credentials") }));
app.use(
	rateLimit({
		max: 100, // limit each IP to 100 requests per windowMs
		windowMs: 60000, // 1 minutes
		message: "Too many request from this IP, please try again after 10 minutes"
	})
);
app.use(helmet(), compression(), express.urlencoded({ extended: true, limit: "10mb" }), express.json({ limit: "10mb" }));
app.use(`/${SERVICE_PATH}`, routes);
app.use("/", routes);
app.use(errorHandler);

export default app;
