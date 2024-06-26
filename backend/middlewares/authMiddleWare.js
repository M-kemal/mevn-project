import jwt from "jsonwebtoken";
import user from "../models/User.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authoriazation header is missing." });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid auth header format!" });
  }
  const token = tokenParts[1];

  console.log("token", token);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decodedToken", decodedToken);

    req.user = await user.findById(decodedToken.userId);

    next();
  } catch (error) {
    console.log("error.name", error.name);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired!" });
    } else {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
};

export { authenticateUser };
