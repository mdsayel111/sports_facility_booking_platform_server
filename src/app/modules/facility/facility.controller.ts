import { RequestHandler } from "express";
import catchAsync from "../../middlewares/HOF.middlewares/catch-async.middleware";
import sendResponse from "../../utils/send-response";
import facilityService from "./facility.service";

// wrap the middleware by catchAsync for async error handleling
const getAllFacility: RequestHandler = catchAsync(async (req, res) => {
  // get query from req.query
  const query = req.query

  // get all facility
  const result = await facilityService.getAllFacility(query);

  // if data not found
  if (result.length === 0) {
    // send no found data response
    return sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  }

  // send response
  sendResponse(res, {
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

// wrap the middleware by catchAsync for async error handleling
const getSingleFacility: RequestHandler = catchAsync(async (req, res) => {
  // get id from req.params
  const { id } = req.params;

  // get all facility
  const result = await facilityService.getSingleFacility(id);

  // if data not found
  if (!result) {
    // send no found data response
    sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  }

  // send response
  sendResponse(res, {
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

// creatFacility middleware
// wrap the middleware by catchAsync for async error handleling
const creatFacility: RequestHandler = catchAsync(async (req, res) => {
  // creat facility
  const result = await facilityService.creatFacility(req.body);

  // send response
  sendResponse(res, {
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

// wrap the middleware by catchAsync for async error handleling
const updateFacility: RequestHandler = catchAsync(async (req, res) => {
  const { _id } = req.params;

  // update facility
  const result = await facilityService.updateFacility(_id, req.body);

  // send response
  sendResponse(res, {
    success: true,
    message: "Facility update successfully",
    data: result,
  });
});

// wrap the middleware by catchAsync for async error handleling
const deleteFacility: RequestHandler = catchAsync(async (req, res) => {
  const { _id } = req.params;

  // delete facility
  const result = await facilityService.deleteFacility(_id);

  // send response
  sendResponse(res, {
    success: true,
    message: "Facility delete successfully",
    data: result,
  });
});

// facility controllers
const facilityControllers = {
  getAllFacility,
  getSingleFacility,
  creatFacility,
  updateFacility,
  deleteFacility,
};

export default facilityControllers;
