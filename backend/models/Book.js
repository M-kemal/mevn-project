import mongoose from "mongoose";

// Schema, MongoDB collection'larında saklanacak dokumanların yapısını tanımlamamızı sağlar.
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    pageNumber: {
      type: Number,
      min: 1,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  // timestamps iki adet alan ekleyecek bu alanlar oluşturacağımız created(oluşturulma zamanı) ve updated(güncellenme zamanı)
  { timestamps: true }
);

// Yukardaki schema yapısını kullanarak modelimizi oluşturacağız.
const Book = mongoose.model("Book", bookSchema);

export default Book;
