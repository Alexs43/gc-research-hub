"use server";

import { supabase } from "../supabaseAdmin";

export default async function deleteUser(ID: string) {
  const { data, error } = await supabase.auth.admin.deleteUser(ID);

  const { error: deleteFromStudent } = await supabase
    .from("student")
    .delete()
    .eq("student_id", ID);
  const { error: deleteFromPerson } = await supabase
    .from("person")
    .delete()
    .eq("person_id", ID);

  if (error) return error;
  return "success";
}
