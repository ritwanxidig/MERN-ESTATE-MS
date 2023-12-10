import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";
import listingRouter from "./routes/listingRouter.js";
import { ExceptionHandlerMiddleware } from "./middlewares/index.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((res) => {
    console.log("connected");
  })
  .catch((er) => {
    console.log(er);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.listen(5555, () => {
  console.log("app listening port 5555");
});

app.use("/auth", authRouter);
app.use("/users", userRoutes);
app.use("/listings", listingRouter);

app.use(ExceptionHandlerMiddleware);
