import React from "react";
import createSupabaseServerClient from "@/utils/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Metadata } from "next";
import Link from "next/link";
import Forms from "./forms";
import readUserSession from "@/utils/actions";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
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
  return {
    title: data?.title,
    description: data?.abstract,
  };
}
type keywordsType = {
  id: string;
  text: string;
}
export default async function SubmissionDetails({ params }: any) {
  const slug = params.slug;
  const supabase = await createSupabaseServerClient();
  const session = await readUserSession();
  const currentUser = session?.data.session?.user?.id || "";
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

  const keywords = JSON.parse(data?.keywords);
  return (
    <div className=" ml-64 w-full">
      <main className="container mx-auto py-20 ">
        <div className="flex justify-start items-center gap-5 ">
          <Link title="back" href="/admin/requests/">
            <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
          </Link>
          <h1 className="text-3xl font-semibold text-primaryGreen">
            Submission Details
          </h1>
        </div>
        <hr className="border-2 border-primaryGreen" />
        <h1 className="text-4xl font-semibold text-foreground mt-5">
          {data?.title}
        </h1>
        <div className="flex justify-between items-center">
          <h3 className="text-xl  mt-4 italic">{`${author?.person?.first_name} ${author?.person?.last_name}`}</h3>
          <div className="flex">
            {keywords.map((keyword: keywordsType) => (
              <Badge key={keyword?.id} variant="outline" className="mr-2">
                {keyword?.text}
              </Badge>
            ))}
          </div>
        </div>
        <h1 className="text-3xl mt-5 font-bold text-primaryGreen ">
          ABSTRACT:
        </h1>
        <p className=" leading-loose text-xl text-foreground mt-5">
          {data?.abstract}
        </p>
        <h1 className="text-md mt-5 font-bold text-primaryGreen">
          FULL TEXT:{" "}
        </h1>
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
        <div className="mt-5">
          <Forms
            status={data?.status}
            review_id={data?.review_id}
            current_user={currentUser}
          />
        </div>
      </main>
    </div>
  );
}
