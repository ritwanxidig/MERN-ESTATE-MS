import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { IsAuthenticated } from "../middlewares/index.js";

const router = express.Router();

router.post("/", IsAuthenticated, createListing);

export default router;
