import AppError from "../../custom-error/app-error";
import QueryBuilder from "../../query-builder/query-builder";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

// get all facility service
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllFacility = async (query: Record<string, any>) => {
  // get all facility
  const facilityQueryModel = new QueryBuilder(
    Facility.find({ isDeleted: false }),
    query,
  );

  facilityQueryModel.search(["name"]).sort("pricePerHour");

  const documentCount = await facilityQueryModel.documentCount()

  const facilities = await facilityQueryModel.modelQuery

  // if facility is null throw error
  if (!facilities) {
    throw new AppError(400, "Failed to get all facility");
  }

  return {
    meta: {
      total: documentCount,
      page: Number(query.page),
      pageNumber: Math.ceil(documentCount / 10)
    },
    data: facilities
  };
};

// get sinle facility service
const getSingleFacility = async (id: string) => {
  // get all facility
  const facility = await Facility.findOne({ _id: id, isDeleted: false });

  // if facility is null throw error
  if (!facility) {
    throw new AppError(400, "Failed to get facility");
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
  getSingleFacility,
  creatFacility,
  updateFacility,
  deleteFacility,
};

export default facilityService;
