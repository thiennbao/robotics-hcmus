import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/account", authController.register);
authRouter.patch("/account/:username", authController.changePassword);
authRouter.delete("/account/:username", authController.deleteAccount);
authRouter.get("/verify", authController.verifyJWT);

export default authRouter;
