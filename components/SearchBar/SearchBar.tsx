'use client';

import { useQuery } from "kotilogi-app/hooks/useQuery";

export function SearchBar(){
    const {onChange} = useQuery('q', null, 450);

    return (
        <input type="search" name="query" placeholder="Etsi..." onInput={onChange}/>
    );
}