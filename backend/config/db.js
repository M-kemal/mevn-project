// mongoose kullanmak için import ediyoruz ve dotenv'yi de
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // await ile uzak sunucudaki verinin gelmesini bekliyoruz. mongoose'a bağlanırken de env içinde sakladığımız mongodb url adresimizi veriyoruz.
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connection has been established");
  } catch (error) {
    console.log("MongoDB connection has feiled", error.message);
    throw error;
  }
};

export default connectDB;
