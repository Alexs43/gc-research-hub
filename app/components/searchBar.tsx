import React, { FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const router = useRouter();
    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        if(formData.get('search') != "" && formData.get('search') != null){
            router.push(`search/?query=${formData.get('search')}`)
        }
    }
    return (


        <form onSubmit={onSubmit} className="relative md:w-1/3 w-full md:block hidden">
            <Input
                type="text"
                title="search"
                placeholder="Search"
                name='search'

            />
            
            <button
                title="search"
                type="submit"
                className="absolute top-1/2 transform -translate-y-1/2 right-5"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>

    )
}
