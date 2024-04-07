import Book from "../models/Book.js";
import {
  isValidObjectId,
  findDocumentById,
  checkValidationErrors,
} from "../utils/index.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error at getAllBooks", error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const getBooksByUploader = async (req, res) => {
  try {
    const uploaderId = req.user._id;

    const books = await Book.find({ uploader: uploaderId });

    res.status(200).json(books);
  } catch (error) {
    console.error("Error at getBooksByUploader", error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const getABook = async (req, res) => {
  console.log("PARAMS", req.params);
  const { id } = req.params;
  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);

    if (!book) return;

    res.status(200).json(book);
  } catch (error) {
    console.error("Error at getABook", error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const createABook = async (req, res) => {
  try {
    const { title, author, description, pageNumber } = req.body;

    const uploader = req.user._id;

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res
        .status(400)
        .json({ error: "A book with same title and author already exist!" });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      pageNumber,
      uploader,
    });

    return res
      .status(201)
      .json({ message: "Book created succesfull", book: newBook });
  } catch (error) {
    // Handle mongoose validation error
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.error("Error at createABook", error);
      return res.status(500).json({ error: "Internal Server error." });
    }
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, pageNumber, raiting } = req.body;

  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);

    if (!book) return;

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.pageNumber = pageNumber || book.pageNumber;
    book.raiting = raiting || book.raiting;

    await book.save();

    res.status(200).json({ massage: "The book updated succesfully" });
  } catch (error) {
    console.error("Error at updateBook", error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id, res)) return;

  try {
    const book = await findDocumentById(Book, id, res);

    if (!book) return;

    await book.deleteOne();
    res.status(200).json({ message: "The book deleted succesfully" });
  } catch (error) {
    console.error("Error at deleteBook", error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

export {
  getAllBooks,
  createABook,
  getABook,
  updateBook,
  deleteBook,
  getBooksByUploader,
};
