import createSupabaseServerClient from "@/utils/supabase";
import CitationGenerator from "./tools";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables, Enums } from "@/types/supabase";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
async function getPaperDetails(id: string, supabase: SupabaseClient) {
  const { data: paperData, error } = await supabase
    .from("published_old_paper")
    .select()
    .eq("id", id)
    .single();
  return paperData;
}
async function getPaperAuthors(id: string, supabase: SupabaseClient) {
  const { data, error } = await supabase.from('author_paper_table_old').select().eq('paper_id', id);
  return data;
}
async function getAuthorDetails(authors: Tables<'author_paper_table_old'>[], supabase: SupabaseClient) {
  const authorPromises: Promise<Tables<'author_old'>>[] = authors.map(async (author_paper: Tables<'author_paper_table_old'>) => {
    const { data: authorDetails } = await supabase.from('author_old').select().eq('author_id', author_paper.author_id);
    if (authorDetails) {
      return authorDetails[0];
    }
  });

  return Promise.all(authorPromises);
}
async function getKeywords(paperId: string, supabase: SupabaseClient) {
  const { data: keywordList, error } = await supabase.from('keywords').select('*').eq('paper_id', paperId);
  return keywordList;
}
export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {

  const supabase = await createSupabaseServerClient();

  const paperData: Tables<"published_old_paper"> = await getPaperDetails(searchParams?.paperId || "", supabase)

  const authorList: Tables<"author_paper_table_old">[] | null = await getPaperAuthors(searchParams?.paperId || "", supabase) || [];

  const authorDetails: Tables<"author_old">[] = await getAuthorDetails(authorList, supabase) || [];

  const keywords: Tables<"keywords">[] = await getKeywords(searchParams?.paperId || "", supabase) || [];
  const publicUrl = supabase.storage.from("documents").getPublicUrl(paperData?.file_path || "");
  return (
    <div className="container mx-auto">
      <div className="flex mt-10 py-10 px-5 gap-3">
        <div className="w-9/12 ">
          {/* <h1 className="text-3xl font-bold">{paperData?.title}</h1>
          <div></div> */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primaryGreen">{paperData?.title}</CardTitle>
              <div className="flex gap-3">
                {authorDetails?.map((details: Tables<'author_old'>) => (
                  <div key={details.author_id}>
                    <CardDescription key={details.author_id} className="font-semibold italic text-lg hover:text-foreground transition-all"><Link href={`authors/about-author?id=${details.author_id}`}>{details.first_name + " " + details.last_name}</Link></CardDescription>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <h1 className="mr-5">Keywords: </h1>
                {keywords?.map((keyword: Tables<'keywords'>) => (
                  <div key={keyword.id}>
                    <Badge key={keyword?.id} variant="outline" className="mr-2 text-md">
                      {keyword?.keyword}
                    </Badge>
                  </div>
                ))}
              </div>

            </CardHeader>
            <Separator />
            <CardContent className="mt-5">
              <h1 className="text-2xl font-extrabold  text-primaryGreen">ABSTRACT:</h1>
              <p className="leading-loose mt-5 ">{paperData?.abstract}</p>
            </CardContent>
            <CardFooter className="gap-4">
              <Button className="flex justify-center items-center">
                <h1 className="mr-5 font-semibold">Download Full Text:</h1>
                <Link title="download pdf"
                  href={publicUrl.data.publicUrl + `?download=${paperData?.title}.pdf`}
                  download={paperData?.title}
                  target="_blank"><Image src="/static/images/pdf-icon.ico" height={20} width={20} alt="pdf icon" /></Link>
              </Button>
              <Button variant="outline" asChild>

                <Link title="download pdf"
                  href={`/pdf?paperId=${paperData?.id}`}

                  target="_blank"><span className="mr-5 font-semibold">Preview Full Text Online:</span><Image src="/static/images/world.png" height={20} width={20} alt="pdf icon" /></Link>

              </Button>
            </CardFooter>
          </Card>

        </div>
        <div className="w-3/12 aspect-square ">
          <CitationGenerator />
        </div>
      </div>
    </div>
  );
}