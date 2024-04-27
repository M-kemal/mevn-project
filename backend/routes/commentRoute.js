import express from "express";
import * as commentController from "../controllers/commentController.js";
import * as authMiddleWare from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.route("/book/:id").get(commentController.getCommentsForBook);

router
  .route("/")
  .post(authMiddleWare.authenticateUser, commentController.createAComment);

export default router;
