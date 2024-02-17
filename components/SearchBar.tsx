'use client';

import { useQuery } from "kotilogi-app/hooks/useQuery";

export function SearchBar(){
    const {updateQuery} = useQuery('q', '', 450);

    return (
        <input type="search" name="query" placeholder="Etsi..." onInput={updateQuery} className="shadow-md text-gray-500"/>
    );
}