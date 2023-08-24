import { Router } from "express";
import userRoute from "./user/user.routes";

const serviceRoute = Router();

serviceRoute.use("/users", userRoute);

export default serviceRoute;
