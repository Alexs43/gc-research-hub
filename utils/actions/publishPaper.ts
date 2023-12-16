"use server";

import createSupabaseServerClient from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { paperSchema } from "@/app/(admin)/admin/(admin-pages)/publish-paper/publish/forms";
import * as z from "zod";
export default async function publishPaper(data: string, file_path?: string) {
  const newData: z.infer<typeof paperSchema> = JSON.parse(data);
  const supabase = await createSupabaseServerClient();
    const paper_id = uuidv4();
    const { data: paperRes, error: paperError } = await supabase
      .from("published_old_paper")
      .insert({
        id: paper_id,
        title: newData.title,
        abstract: newData.abstract,
        file_path: file_path,
        publication_date: new Date(),
        department_id: newData.college_id,
        course_id: newData.course_id,
        year_id: newData.year_id,
      });

    const { data: keywords, error: keywordsError } = await supabase
      .from("keywords")
      .insert(
        newData.keywords.map((keyword) => ({
          keyword: keyword.text,
          paper_id: paper_id,
        }))
      );
  let authorRes = [] as any; // Declare the array to store author_ids

  for (const author of newData.authors) {
    const { data: existingAuthors, error: existingAuthorsError } =
      await supabase.from("author_old").select().eq("email", author.email);

    if (existingAuthors && existingAuthors.length > 0) {
      // Email already exists, do something
      authorRes.push(existingAuthors);
      console.log("Email already exists");
    } else {
      // Email does not exist, upsert the data
      const { data: saveAuthor, error: saveAuthorError } = await supabase
        .from("author_old")
        .upsert({
          first_name: author.first_name,
          middle_name: author.middle_name,
          last_name: author.last_name,
          email: author.email,
          contact_num: author.contact_num,
        })
        .select();

      if (saveAuthor && saveAuthor.length > 0) {
        authorRes.push(saveAuthor); // Add the author_id response to the array
      }
    }
  }
  const { data: authorPaperRes, error: authorPaperErr} = await supabase.from('author_paper_table_old').upsert(
    authorRes.map((author: any) => ({
      author_id: author[0].author_id,
      paper_id: paper_id,
    }))
  )
  console.log(authorPaperRes)
  console.log(authorPaperErr)
  
  if(authorPaperRes){
    return "success";
  }
  else{
    return "error";
  }
 
}
