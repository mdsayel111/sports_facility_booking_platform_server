import z from "zod";
import hashPassword from "../../../lib/bcrypt-ts/hash-password";

// signup validation schema
const signupValidationSchema = z
  .object({
    name: z.string({ required_error: "Name is requiered !" }),
    email: z
      .string({ required_error: "Email is required !" })
      .email("Invalid email address"),
    phone: z.string({ required_error: "Phone number is required !" }),
    password: z.string({ required_error: "Password is required !" }),
    role: z.enum(["admin", "user"], { required_error: "Role is required !" }),
    address: z.string({ required_error: "Address is required !" }),
    isDeleted: z.boolean().default(false),
  })
  .refine(async (data) => {
    try {
      // set isDeleted false by default
      data.isDeleted = false;
      // set hash paswoord to password in data
      data.password = await hashPassword(data.password)
      return true;
    } catch (error) {
      return false
    }
  });

// login validation shcema
const loginValidationSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required !" })
      .email("Invalid email address"),
    password: z.string({ required_error: "Password is required !" }),
  })

const authZodSchemas = {
  signupValidationSchema,
  loginValidationSchema
};

export default authZodSchemas;
