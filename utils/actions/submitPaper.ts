"use server";

// import createSupabaseServerClient from "../supabase";
import { createClient } from "@supabase/supabase-js";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { submissionSchema } from "@/app/(client)/submit-paper/submissionForm";
export default async function submitPaper(data: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  const author_id = data.get("author_id");
  const author_role = data.get("author_role");
  const title = data.get("title");
  const abstract = data.get("abstract");
  const keywords = data.get("keywords");
  const file_path = data.get("file_path");
  let authorCreateRes: any;
  const { data: authorExists, error: authorExistsError } = await supabase
    .from("author")
    .select("*")
    .eq("author_id", author_id);
  if (authorExistsError) throw authorExistsError;
  if (authorExists.length === 0) {
    const authorCreateRes = await supabase.from("author").insert({
      author_id: author_id,
      person_id: author_id,
      created_at: new Date(),
      author_type: author_role,
    });
  }

  if (authorCreateRes.error) throw authorCreateRes.error;
  console.log(authorCreateRes.data);
  const { data: paperRes, error: paperError } = await supabase
    .from("submitted_papers")
    .insert({
      review_id: uuidv4(),
      title: title,
      author_id: author_id,
      abstract: abstract,
      keywords: keywords,
      status: "Submitted",
      file_path: file_path,
    });
  if (paperError) throw paperError;
  console.log(paperRes);
  return "success";
}
