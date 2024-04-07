import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.get("/account", authMiddleware.checkIsRoot, authController.getAccountList);
authRouter.get("/account/:id", authMiddleware.checkIsRightUser, authController.getAccountInfo);
authRouter.post("/account", authMiddleware.checkIsRoot, authController.register);
authRouter.patch("/account/:id", authMiddleware.checkIsRightUser, authController.changePassword);
authRouter.delete("/account/:id", authMiddleware.checkIsRoot, authController.deleteAccount);
authRouter.post("/login", authController.login);
authRouter.get("/verify", authController.verifyJWT);

export default authRouter;
