import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

// creat facility service
const creatFacility = async (payload: TFacility) => {
  // creat user
  const user = await Facility.create(payload);
  return user;
};

// facility services
const facilityService = {
  creatFacility,
};

export default facilityService;
