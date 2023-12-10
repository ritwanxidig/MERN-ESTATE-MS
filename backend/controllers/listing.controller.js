import { errorHandler } from "../Utils/error.js";
import { listingModel } from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const {
      name,
      address,
      description,
      regularPrice,
      discountPrice,
      bathRooms,
      bedRooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      userRef,
    } = req.body;
    if (!name || !address || !description || !regularPrice || !discountPrice)
      return next(errorHandler(400, "please fill the all fields"));

    const newList = await listingModel.create(req.body);
    return res.status(201).json(newList);
  } catch (error) {
    next(error);
  }
};
