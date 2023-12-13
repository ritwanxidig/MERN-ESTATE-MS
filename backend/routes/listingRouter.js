import express from "express";
import {
  SearchListings,
  createListing,
  deleteListing,
  getAllListings,
  getSingleListing,
  getUserListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { IsAuthenticated } from "../middlewares/index.js";

const router = express.Router();

router.get("/", getAllListings);
router.get("/user-listings", IsAuthenticated, getUserListings);
router.get("/get", SearchListings);
router.get("/:id", IsAuthenticated, getSingleListing);
router.post("/", IsAuthenticated, createListing);
router.put("/:id", IsAuthenticated, updateListing);
router.delete("/:id", IsAuthenticated, deleteListing);

export default router;
