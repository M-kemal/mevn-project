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
    raiting: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  // timestamps iki adet alan ekleyecek bu alanlar oluşturacağımız created(oluşturulma zamanı) ve updated(güncellenme zamanı)
  { timestamps: true }
);

// Yukardaki schema yapısını kullanarak modelimizi oluşturacağız.
const Book = mongoose.model("Book", bookSchema);

export default Book;
