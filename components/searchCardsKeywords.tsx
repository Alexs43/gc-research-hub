"use client";
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { supabase } from '@/utils/supabaseBrowser';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';
import { Tables } from "@/types/supabase"
import { unknown } from 'zod';
export default function SearchCardsKeywords({ paperId }: { paperId: string }) {
    const [authors, setAuthors] = useState<any>([]);
    const [authorDetails, setAuthorDetails] = useState<any>([]);
    const [keywords, setKeywords] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paperDetails, setPaperDetails] = useState<Tables<'published_old_paper'> | undefined>();
    useEffect(() => {
        async function fetchData() {
            const authors = await getAuthors(paperId)
            const keywords = await getKeywords(paperId)
            getPaperDetails(paperId)
            setLoading(false)
        }
        fetchData();
    }, [])
    async function getKeywords(paperId: string) {
        const { data: keywordList, error } = await supabase.from('keywords').select('*').eq('paper_id', paperId);
        setKeywords(keywordList);
    }
    async function getAuthors(id: string) {
        const { data: authorList, error } = await supabase.from('author_paper_table_old').select().eq('paper_id', id);
        console.log(authorList)
        setAuthors(authorList)
        getAuthorDetails(authorList)
    }
    async function getPaperDetails(id: string) {
        const { data, error } = await supabase.from('published_old_paper').select("*").eq('id', paperId)

        const paperDets: Tables<'published_old_paper'> | undefined = data ? data[0] : undefined;

        setPaperDetails(paperDets);
    }
    async function getAuthorDetails(authors: any) {
        const promises = authors.map(async (author_paper: any) => {
            const { data: authorDetails, error } = await supabase.from('author_old').select().eq('author_id', author_paper.author_id);
            if (authorDetails) {
                return authorDetails[0];
            }
        });

        Promise.all(promises).then(allDetails => {
            setAuthorDetails(allDetails);
        });
    }
    function customTrim(inputString: string | undefined | null, maxLength: number) {
        if(!inputString) return ""
        if (inputString.length <= maxLength) {
            return inputString;
        }

        let lastSpaceIndex = inputString.lastIndexOf(' ', maxLength);
        lastSpaceIndex = lastSpaceIndex !== -1 ? lastSpaceIndex : maxLength;
        const trimmedString = inputString.substring(0, lastSpaceIndex).trim() + ' ...';
        return trimmedString;
    }

    // Example usage

    return (
        <Card className="mt-5">
            <CardHeader>
                <CardTitle>{loading ? <Skeleton className="h-10 w-[300px]" /> : <Link className='hover:underline transition-all' rel="noopener noreferrer" target="_blank" href={`/paper?paperId=${paperDetails?.id}`}>{paperDetails?.title}</Link>}</CardTitle>
                <div>

                </div>
                <div className="flex items-center">
                    {loading ? <Skeleton className="h-3 w-full" /> : (<>
                        <h1 className='font-semibold text-sm mr-3'>Keywords: </h1>
                        {keywords?.map((keyword: any) => (
                            <div key={keyword.id}>
                                <Badge key={keyword?.id} variant="outline" className="mr-2">
                                    {keyword?.keyword}
                                </Badge>
                            </div>
                        ))}</>)}
                </div>
                <div className="flex gap-3">
                    {loading ? <Skeleton className="h-3 w-[300px]" /> : (<>
                        {authorDetails?.map((details: any) => (
                            <div key={details.author_id}>
                                <CardDescription key={details.author_id} className=" italic">{details.first_name + " " + details.last_name}</CardDescription>
                            </div>
                        )
                        )}</>)}

                </div>

            </CardHeader>
            <CardContent>
                {loading ? (<div >
                    <Skeleton className='h-3 w-full mt-2' />
                    <Skeleton className='h-3 w-full mt-2' />
                    <Skeleton className='h-3 w-full mt-2' />
                </div>) : <p>{customTrim(paperDetails?.abstract, 500)}</p>
                }
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link rel="noopener noreferrer" target="_blank" href={`/paper?paperId=${paperDetails?.id}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>

    )
}
