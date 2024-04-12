import express from "express";
import * as bookController from "../controllers/bookController.js";
import * as authMiddleWare from "../middlewares/authMiddleWare.js";

const router = express.Router();

router
  .route("/uploader")
  .get(authMiddleWare.authenticateUser, bookController.getBooksByUploader);

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(authMiddleWare.authenticateUser, bookController.createABook);
router
  .route("/:id")
  .get(bookController.getABook)
  .put(authMiddleWare.authenticateUser, bookController.updateBook)
  .delete(authMiddleWare.authenticateUser, bookController.deleteBook);

export default router;
