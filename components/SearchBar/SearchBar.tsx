'use client';

import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function SearchBar(){
    //const {dispatch} = usePageWithDataContext();
    const router = useRouter();
    const route = usePathname();
    const {data, onChange} = useChangeInput({query: ''});

    const updateSearch = (e) => {
        //const newUrl = new URL(route);
        //newUrl.searchParams.set('q', e.target.value);
        
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace(route + `?q=${data.query}`);
        }, 450);

        return () => clearTimeout(timeout);
    }, [data.query]);

    return (
        <input type="search" name="query" placeholder="Etsi..." onInput={onChange}/>
    );
}