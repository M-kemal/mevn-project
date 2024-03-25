import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 20,
      match: [emailRegex, "invalid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 10,
      minLength: 4,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  // timestamps iki adet alan ekleyecek bu alanlar oluşturacağımız created(oluşturulma zamanı) ve updated(güncellenme zamanı)
  { timestamps: true }
);

// Yukardaki schema yapısını kullanarak modelimizi oluşturacağız.
const User = mongoose.model("User", userSchema);

export default User;