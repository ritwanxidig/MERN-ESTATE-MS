import express from "express";
import {
  createListing,
  getAllListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { IsAuthenticated } from "../middlewares/index.js";

const router = express.Router();

router.get("/", IsAuthenticated, getAllListings);
router.post("/", IsAuthenticated, createListing);
router.put("/", IsAuthenticated, updateListing);

export default router;
