import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getSingleListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { IsAuthenticated } from "../middlewares/index.js";

const router = express.Router();

router.get("/", IsAuthenticated, getAllListings);
router.get("/:id", IsAuthenticated, getSingleListing);
router.post("/", IsAuthenticated, createListing);
router.put("/:id", IsAuthenticated, updateListing);
router.delete("/:id", IsAuthenticated, deleteListing);

export default router;
