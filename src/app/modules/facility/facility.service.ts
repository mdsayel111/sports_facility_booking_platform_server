import AppError from "../../custom-error/app-error";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

// getAll facility service
const getAllFacility = async () => {
  // get all facility
  const facility = await Facility.find({isDeleted: false});

  // if facility is null throw error
  if (!facility) {
    throw new AppError(400, "Failed to get all facility");
  }

  return facility;
};

// creat facility service
const creatFacility = async (payload: TFacility) => {
  // creat user
  const facility = await Facility.create(payload);

  // if facility is null throw error
  if (!facility) {
    throw new AppError(400, "Failed to creat facility");
  }

  return facility;
};

// update facility service
const updateFacility = async (_id: string, payload: Partial<TFacility>) => {
  // update facility
  const facility = await Facility.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  // if facility is null throw error
  if (!facility) {
    throw new AppError(400, "Failed to update facility");
  }

  return facility;
};

// delete facility service
const deleteFacility = async (_id: string) => {
  // delete facility
  const facility = await Facility.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    { new: true },
  );

  // if facility is null throw error
  if (!facility) {
    throw new AppError(400, "Failed to delete facility");
  }

  return facility;
};

// facility services
const facilityService = {
  getAllFacility,
  creatFacility,
  updateFacility,
  deleteFacility,
};

export default facilityService;
