import { Router } from "express";
import userRoute from "./user/user.routes";
import postRoute from "./post/post.routes";

const serviceRoute = Router();

serviceRoute.use("/users", userRoute);
serviceRoute.use("/posts", postRoute);

export default serviceRoute;
