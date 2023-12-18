"use client"

import React, { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabaseBrowser'
import SearchCards from './searchCards'
import SearchCardsKeywords from '@/components/searchCardsKeywords'
import { Skeleton } from "@/components/ui/skeleton"
import { Tables } from '@/types/supabase'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Results() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || "";

    const [results, setResults] = useState<Tables<'published_old_paper'>[]>([]);
    const [keywordResults, setKeywordResults] = useState<Tables<'keywords'>[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function getResults(query: string) {
            setLoading(true)
            let queryArray = query.split(" ");
            const queryText = queryArray.join(' <-> ')
            console.log(queryText)
            const { data, error } = await supabase.from('published_old_paper').select().textSearch('title', queryText)
            const { data: keywords, error: keywordError } = await supabase.from('keywords').select("*").textSearch('keyword', queryText)
           
            // Filter keywords based on paper_id
            
            const paperQuery: Tables<'published_old_paper'>[] = data || [];
            const keywordsQuery: Tables<'keywords'>[] = keywords || [];
            setResults(paperQuery)
            setKeywordResults(keywordsQuery)
            paperQuery.map((result)=>{
                let newKeywordsArr = keywordsQuery.filter((keyword)=>{
                    keyword.paper_id != result.id
                })
                setKeywordResults(newKeywordsArr)
            })
           
            setLoading(false)
        }
       
        getResults(query);
    
        
    }, [query])
   
    return (
        <div className="container mx-auto">
            <div className='text-center py-20 border-b mb-5 flex justify-center items-center'>
                {loading ? <Skeleton className="h-10 w-[300px]" /> : <h1 className="text-2xl font-bold text-primaryGreen uppercase">Search Results for &quot;{query}&quot;</h1>}

            </div>
            <div className='my-10'>
                {loading ? <LoadingCard /> : <> {results.length > 0 ? <>{results?.map((result: any) => (
                    <div key={result.id}>
                        <SearchCards data={result} />
                    </div>
                ))}</> : <></>}</>}
                {loading ? <LoadingCard /> : <> {keywordResults.length > 0 ? <>{keywordResults?.map((result: any) => (
                    <div key={result.id}>
                        <SearchCardsKeywords paperId={result.paper_id} />
                    </div>
                ))}</> : <></>}</>}
                {loading ? <></> : <> {results.length === 0 && keywordResults.length === 0 ? <div className='text-center py-20'> <h1 className="text-2xl font-bold text-primaryGreen uppercase">No Results Found</h1></div> : <></>}</>
                }
            </div>
        </div>
    )
}


function LoadingCard() {
    return (
        <Card className="mt-5">
            <CardHeader>
                <CardTitle><Skeleton className="h-10 w-[300px]" /> </CardTitle>
                <div>

                </div>
                <div className="flex items-center">
                    <Skeleton className="h-3 w-full" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-3 w-[300px]" />
                </div>
            </CardHeader>
            <CardContent>
                <div >
                    <Skeleton className='h-3 w-full mt-2' />
                    <Skeleton className='h-3 w-full mt-2' />
                    <Skeleton className='h-3 w-full mt-2' />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className='h-14 w-1/12 mt-2' />
            </CardFooter>
        </Card>
    )
}