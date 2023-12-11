import express from "express";
import {
  createListing,
  getAllListings,
} from "../controllers/listing.controller.js";
import { IsAuthenticated } from "../middlewares/index.js";

const router = express.Router();

router.get("/", IsAuthenticated, getAllListings);
router.post("/", IsAuthenticated, createListing);

export default router;
