import User from "../models/User.js";
import { checkValidationErrors } from "../utils/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmail = await User.findOne({ email });
    console.log(existingEmail);

    if (existingEmail) {
      return res.status(400).json({ error: "The Email is already exist!" });
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created succesfull", user: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.error("Error at Register", error);
      return res.status(500).json({ error: "Internal Server error." });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //checkuser if exist
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    //check if password correct
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Your password is not true!" });
    }

    user.password = undefined;

    return res.status(200).json({ message: "User log in successfully", user });
  } catch (error) {
    console.error("Error at Login", error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

export { register, login };
