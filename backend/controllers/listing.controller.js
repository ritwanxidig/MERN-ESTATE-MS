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
    if (!name || !address || !regularPrice)
      return next(errorHandler(400, "please fill the all fields"));

    const newList = await listingModel.create(req.body);
    return res.status(201).json(newList);
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const { id } = req.user;
    const data = await listingModel.find({ userRef: id });
    if (data.length <= 0) return res.status(400).json("no listings");
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const getSingleListing = async(req,res,next) => {
  const { id } = req.params;
  try {
    const data = await listingModel.findById(id);
    if (!data) return next(errorHandler(404, "listing not found"));
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const updateListing = async (req, res, next) => {
  const { id } = req.params;
  try {
    // first check if this listing exists
    const existListing = await listingModel.findById(id);
    if (!existListing) return next(errorHandler(404, "listing not found"));

    // then update
    const data = await listingModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const { id } = req.params;
  try {
    // first check if this listing exists
    const existListing = await listingModel.findById(id);
    if (!existListing) return next(errorHandler(404, "listing not found"));

    // then delete
    const data = await listingModel.findByIdAndDelete(id);
    return res.status(200).json("listing has been deleted successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
