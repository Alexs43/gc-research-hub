"use client"

import React, { useState, useRef } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { useToast } from '@/components/ui/use-toast'
function generateAPA7Citation(author: string[], publicationYear: string, title: string, source: string) {
    // Format author names
    const formattedAuthors = formatAuthors(author);

    // Format the citation
    const citation = `${formattedAuthors} (${publicationYear}). ${title}. ${source}.`;

    return citation;
}
function generateMLACitation(author: string[], title: string, containerTitle: string, publicationDate: string, pageRange: string) {
    // Format author names
    const formattedAuthors = formatMLAAuthors(author);

    // Format the citation
    const citation = `${formattedAuthors} "${title}." ${containerTitle}, ${publicationDate}, ${pageRange}.`;

    return citation;
}
function formatAuthors(author: string[]) {
    // If there is only one author, return the name as is
    if (author.length === 1) {
        return `${author[0]}.`;
    }

    // If there are two authors, separate them with an ampersand (&)
    if (author.length === 2) {
        return `${author[0]} & ${author[1]}.`;
    }

    // If there are more than two authors, list the first author followed by "et al."
    if (author.length > 2) {
        return `${author[0]} et al.`;
    }

    // Default case (no author information)
    return 'Anonymous.';
}
function formatMLAAuthors(author: string[]) {
    // If there is only one author, return the name as is
    if (author.length === 1) {
        return `${author[0]}`;
    }

    // If there are two authors, separate them with an ampersand (&)
    if (author.length === 2) {
        return `${author[0]} and ${author[1]}`;
    }

    // If there are more than two authors, list the first author followed by "et al."
    if (author.length > 2) {
        return `${author[0]} et al.`;
    }

    // Default case (no author information)
    return 'Anonymous';
}
function generateChicagoCitation(author: string[], title: string, containerTitle: string, publicationYear: string, pageRange: string) {
    // Format author names
    const formattedAuthors = formatAuthorsChicago(author);

    // Format the citation
    const citation = `${formattedAuthors} ${publicationYear}, "${title}," ${containerTitle}, ${pageRange}.`;

    return citation;
}

function formatAuthorsChicago(author: string[]) {
    // If there is only one author, return the name as is
    if (author.length === 1) {
        return `${author[0]}`;
    }

    // If there are two authors, separate them with "and"
    if (author.length === 2) {
        return `${author[0]} and ${author[1]}`;
    }

    // If there are more than two authors, list the first author followed by "et al."
    if (author.length > 2) {
        return `${author[0]} et al.`;
    }

    // Default case (no author information)
    return 'Anonymous';
}
const authorArray = ['Doe, John', 'Smith, Alice'];
const title = 'The Title of the Article';
const containerTitle = 'Journal of Example Research';
const publicationDate = '10 Jan. 2022';
const pageRange = '30-45';
const publicationYear = "2022";
let citationRes: string;


export default function CitationGenerator() {
    const { toast } = useToast();
    const [citation, setCitation] = useState<string>("");
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);

    const handleCopyClick = () => {
        if (paragraphRef.current) {
            const range = document.createRange();
            range.selectNode(paragraphRef.current);

            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);

                document.execCommand('copy');

                selection.removeAllRanges();

            }

        }
        toast({
            title: "Citation Copied!",
            description: "Citation Successfully Copied on Your Clipboard",
            duration: 500,
        })
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Citation Generator</CardTitle>
                <Separator className="my-4" />
            </CardHeader>
            <CardContent>
                <Select onValueChange={(value) => {
                    console.log(value)
                    switch (value) {
                        case "APA7":
                            setCitation(generateAPA7Citation(authorArray, publicationYear, "DORMHUNT: An Online Platform for Searching Dorms Featuring Roommate Matching Using Natural Language Processing and Content-Based Filtering Algorithms", "Gordon College Research Department"))
                            break;
                        case "MLA":
                            setCitation("MLA");
                            break;
                        case "CHICAGO":
                            setCitation("CHICAGO BULLS");
                            break;


                    }
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="APA7">APA7</SelectItem>
                        <SelectItem value="MLA">MLA</SelectItem>
                        <SelectItem value="CHICAGO">CHICAGO</SelectItem>
                    </SelectContent>
                </Select>

            </CardContent>
            <CardFooter>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger  ><p ref={paragraphRef} onClick={handleCopyClick} className='text-left shadow-sm border p-5 rounded-md  hover:bg-muted transition-all font-serif'>{citation}</p></TooltipTrigger>
                        <TooltipContent>
                            <p><FontAwesomeIcon icon={faClipboard} fixedWidth /> Copy to Clipboard</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </CardFooter>
        </Card>
    )
}
