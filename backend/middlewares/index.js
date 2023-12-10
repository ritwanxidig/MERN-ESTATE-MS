import { errorHandler } from "../Utils/error.js";
import jwt from "jsonwebtoken";

export const ExceptionHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
};

export const IsAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "UnAuthorized user"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};
