"use server";

import { supabase } from "../supabaseAdmin";
import { formSchema } from "@/schemas/createUserSchema";
import * as z from "zod";
export default async function signUpUser(data: z.infer<typeof formSchema>) {
  const newUser = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      contact_number: data.contact_number,
      role: data.role,
      college_id: data.college_id,
      course_id: data.course_id,
      year_level: data.year_level,
      block: data.block,
      date_of_birth: data.date_of_birth,
      gender: Boolean(Number(data.gender)),
    },
  });
  return newUser;
}
