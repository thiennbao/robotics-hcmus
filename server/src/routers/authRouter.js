import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/account", authController.getAccountList);
authRouter.get("/account/:id", authController.getAccountInfo);
authRouter.post("/account", authController.register);
authRouter.patch("/account/:id", authController.changePassword);
authRouter.delete("/account/:id", authController.deleteAccount);
authRouter.post("/login", authController.login);
authRouter.get("/verify", authController.verifyJWT);

export default authRouter;
