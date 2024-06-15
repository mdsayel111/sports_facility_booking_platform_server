import z from "zod";

// booking validation schema
const bookingValidationSchema = z
    .object({
        date: z.date({ required_error: "Date is requiered !" }),
        startTime: z.string({ required_error: "Start time is required !" }),
        endTime: z.string({
            required_error: "End time per hour number is required !",
        }),
        user: z.string({ required_error: "User is required !" }),
        facility: z.string({ required_error: "Facility is required !" }),
        isDeleted: z.boolean().default(false),
    })
    .refine((data) => {
        // set isDeleted = false forcefully
        data.isDeleted = false;
        return true;
    });

const bookingZodSchemas = {
    bookingValidationSchema,
};

export default bookingZodSchemas;
