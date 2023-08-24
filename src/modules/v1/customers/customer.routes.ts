import { Router } from "express";
import { createAccount } from "./customer.controller";
import { validationMiddleware } from "@massteck/common-gpy";
import { validateSignup } from "./customer.validation";

const customerRoute = Router();
customerRoute.route("/signup").post(validateSignup, validationMiddleware, createAccount);

export default customerRoute;
