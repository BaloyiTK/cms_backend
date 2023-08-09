import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user_id = verified.id;

    next();
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

export default protect;
