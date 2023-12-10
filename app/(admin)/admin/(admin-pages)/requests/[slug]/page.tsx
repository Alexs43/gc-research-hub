import React from "react";
import createSupabaseServerClient from "@/utils/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
export const metadata = {
  title: "Submission Details | GC Research Hub",
  description: "Submission Details",
};
export default async function SubmissionDetails({ params }: any) {
  const slug = params.slug;
  const supabase = await createSupabaseServerClient();
  const { data: submission, error } = await supabase
    .from("submitted_papers")
    .select("*")
    .eq("review_id", slug);

  const data = (submission && submission[0]) || {};
  const { data: authors, error: authorError } = await supabase
    .from("author")
    .select("*, person(*)")
    .eq("author_id", data?.author_id);
  const author = authors && authors[0];
  const publicUrl = supabase.storage
    .from("documents")
    .getPublicUrl(data?.file_path);
  return (
    <main className="container mx-auto py-20">
      <h1 className="text-3xl font-semibold text-primaryGreen">
        Submission Details
      </h1>
      <hr className="border-2 border-primaryGreen" />
      <h1 className="text-4xl font-semibold text-foreground mt-5">
        {data?.title}
      </h1>
      <h3 className="text-xl  mt-4 italic">{`${author?.person?.first_name} ${author?.person?.last_name}`}</h3>
      <h1 className="text-3xl mt-5 font-bold text-primaryGreen ">ABSTRACT:</h1>
      <p className=" leading-loose text-xl text-foreground mt-5">
        {data?.abstract}
      </p>
      <h1 className="text-md mt-5 font-bold text-primaryGreen">FULL TEXT: </h1>
      <a
        title="download pdf"
        href={publicUrl.data.publicUrl}
        download={data?.title}
        target="_blank"
        className="flex items-center gap-2 mt-5 w-fit "
      >
        <FontAwesomeIcon
          icon={faFilePdf}
          className="text-5xl text-primaryGreen"
        />
      </a>
    </main>
  );
}
