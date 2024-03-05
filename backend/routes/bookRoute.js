import express from "express";
import * as bookController from "../controllers/bookController.js";
// * as ile bookController içerisindeki tüm methodları import etmiş oluyor.

const router = express.Router();

// router.get("/", bookController.getAllBooks);
// router.post("/", bookController.createABook);
// router.get("/:id", bookController.getABook);
// router.put("/:id", bookController.updateBook);
// router.delete("/:id", bookController.deleteBook);

//* Zincir şeklinde router

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
