import * as z from "zod";

export const formSchema = z.object({
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(1, { message: "First name is required" }),
  middle_name: z
    .string({
      required_error: "First name is required",
    })
    .min(1, { message: "First name is required" }),
  last_name: z
    .string({
      required_error: "First name is required",
    })
    .min(1, { message: "First name is required" }),
  role: z.string({
    required_error: "Role is required",
  }),
  college_id: z.string({
    required_error: "College is required",
  }),
  course_id: z.string().optional(),
  year_level: z.string().optional(),
  block: z.string().optional(),
  gender: z.string({ required_error: "Gender is required" }),
  contact_number: z
    .string({
      required_error: "Contact number is required",
    })
    .min(1, { message: "Contact number is required" }),
  date_of_birth: z.date(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(7, { message: "Password is required" })
    .max(20, { message: "Password is required" }),
});
