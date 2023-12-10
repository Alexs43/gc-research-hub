"use server";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, Submission } from "./columns";
import { createClient } from "@supabase/supabase-js";

async function getSubmissions(): Promise<Submission[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  let { data: submitted_papers, error } = await supabase
    .from("author")
    .select(`*, person(*), submitted_papers(*) `);
  if (error) console.log(error);
  const submissions = submitted_papers?.map((paper: any) => {
    return {
      id: paper.submitted_papers[0]?.review_id,
      title: paper.submitted_papers[0]?.title,
      author_name: `${paper.person?.first_name} ${paper.person?.last_name}`,
      author_email: paper.person?.email,
      review_id: paper.submitted_papers[0]?.review_id,
      status: paper.submitted_papers[0]?.status,
    };
  });
  return submissions || [];
}
export default async function DataTableContainer() {
  const sampleData = await getSubmissions();
  return (
    <div>
      <DataTable columns={columns} data={sampleData} />
    </div>
  );
}
