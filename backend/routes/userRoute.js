import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleWare from "../middlewares/authMiddleWare.js";

const router = express.Router();

router
  .route("/updateUser")
  .put(authMiddleWare.authenticateUser, userController.updateUser);

export default router;
