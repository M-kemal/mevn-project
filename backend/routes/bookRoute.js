import express from "express";
import * as bookController from "../controllers/bookController.js";

const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createABook);
router
  .route("/:id")
  .get(bookController.getABook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
