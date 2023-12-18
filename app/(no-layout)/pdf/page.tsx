

import React from 'react';
import { Metadata } from 'next';
import { Tables } from "@/types/supabase";
import { SupabaseClient } from '@supabase/supabase-js';
import createSupabaseServerClient from '@/utils/supabase';


export async function generateMetadata({
    params,
    searchParams,
}: any): Promise<Metadata> {
    const paperId = searchParams?.paperId;
    const supabase = await createSupabaseServerClient();
    const paperData: Tables<"published_old_paper"> = await getPaperDetails(paperId || "", supabase)
    return {
        title: paperData?.title,
        description: paperData?.abstract,
    };
}
async function getPaperDetails(id: string, supabase: SupabaseClient) {
    const { data: paperData, error } = await supabase
        .from("published_old_paper")
        .select()
        .eq("id", id)
        .single();
    return paperData;
}
export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    const paperId = searchParams?.paperId;
    const supabase = await createSupabaseServerClient();
    const paperData: Tables<"published_old_paper"> = await getPaperDetails(paperId || "", supabase)
    const publicUrl = supabase.storage.from("documents").getPublicUrl(paperData?.file_path || "");
    return (
        <div className="h-screen">
            <object className='h-screen' data={publicUrl.data.publicUrl} type="application/pdf" width="100%" height="600px"></object>
        </div>
    );
};

