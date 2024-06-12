import z from "zod";

// user validation schema
const userValidationSchema = z.object({
    name: z.string({ required_error: "Name is requiered !" }),
    email: z.string({ required_error: "Email is required !" }).email("Invalid email address"),
    phone: z.string({ required_error: "Phone number is required !" }),
    password: z.string({ required_error: "Password is required !" }),
    role: z.enum(["admin", "user"]).default("user"),
    address: z.string({ required_error: "Address is required !" }),
    isDeleted: z.boolean().default(true)
}).refine((data) => {
    // set role = "user" forcefully 
    data.role = "user"
    return true
});

const authZodSchemas = {
    userValidationSchema
}

export default authZodSchemas