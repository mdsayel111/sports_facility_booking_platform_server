import z from "zod";

// facility creat validation schema
const facilityValidationSchema = z.object({
  name: z.string({ required_error: "Name is requiered !" }),
  img: z.string({ required_error: "Image is requiered !" }),
  description: z.string({ required_error: "Description is required !" }),
  pricePerHour: z.number({
    required_error: "Price per hour number is required !",
  }),
  location: z.string({ required_error: "location is required !" }),
});

// facility update validation schema
const facilityUpdateValidationSchema = z.object({
  name: z.string().optional(),
  img: z.string().optional(),
  description: z.string().optional(),
  pricePerHour: z.number().optional(),
  location: z.string().optional(),
});

const facilityZodSchemas = {
  facilityValidationSchema,
  facilityUpdateValidationSchema,
};

export default facilityZodSchemas;
