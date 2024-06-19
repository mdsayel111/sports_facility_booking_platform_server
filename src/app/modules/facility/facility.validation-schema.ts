import z from "zod";

// facility validation schema
const facilityValidationSchema = z
  .object({
    name: z.string({ required_error: "Name is requiered !" }),
    description: z.string({ required_error: "Description is required !" }),
    pricePerHour: z.number({
      required_error: "Price per hour number is required !",
    }),
    location: z.string({ required_error: "location is required !" }),
    isDeleted: z.boolean().default(false),
  })
  .refine((data) => {
    // set isDeleted = false forcefully
    data.isDeleted = false;
    return true;
  });

const facilityZodSchemas = {
  facilityValidationSchema,
};

export default facilityZodSchemas;
