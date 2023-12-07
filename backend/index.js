import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(5555, () => {
  console.log("app listening port 5555");
});
