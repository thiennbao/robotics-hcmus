import express from "express";
import memberController from "../../controllers/memberController.js";

const memberRouter = express.Router();

memberRouter.get("/", memberController.getMembers);
memberRouter.get("/:slug", memberController.getMember);
memberRouter.post("", memberController.postMember);
memberRouter.patch("/:slug", memberController.patchMember);
memberRouter.delete("/:slug", memberController.deleteMember);

export default memberRouter;
