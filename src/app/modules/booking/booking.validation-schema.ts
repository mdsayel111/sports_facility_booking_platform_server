import z from "zod";

// booking validation schema
const bookingValidationSchema = z.object({
  date: z.string({ required_error: "Date is requiered !" }),
  startTime: z
    .string({ required_error: "Start time is required !" })
    .regex(/^\d{2}:\d{2}$/, `Provide 'HH:MM' this type date !`),
  endTime: z
    .string({
      required_error: "End time per hour number is required !",
    })
    .regex(/^\d{2}:\d{2}$/, `Provide 'HH:MM' this type date !`),
  facility: z.string({ required_error: "Facility is required !" }),
});

const bookingZodSchemas = {
  bookingValidationSchema,
};

export default bookingZodSchemas;
