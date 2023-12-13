"use server";

import createSupabaseServerClient from "../supabase";
import * as z from "zod";
import { commmentSchema } from "@/app/(admin)/admin/(admin-pages)/requests/[slug]/forms";
export default async function addComments(
  data: z.infer<typeof commmentSchema>
): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const { data: res, error } = await supabase
    .from("submitted_paper_comments")
    .insert({
      comments: data.comment,
      sub_paper_id: data.review_id,
      created_at: new Date(),
      comment_owner: data.comment_owner_id,
    });

  const { data: res2, error: error2 } = await supabase
    .from("submitted_papers")
    .update({
      status: data.status,
    })
    .eq("review_id", data.review_id);
  if (error) {
    throw error;
  }
  if (error2) {
    throw error2;
  }
  return "success";
}
