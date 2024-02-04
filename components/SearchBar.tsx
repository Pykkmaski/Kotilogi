'use client';

import { useQuery } from "kotilogi-app/hooks/useQuery";

export function SearchBar(){
    const {onChange} = useQuery('q', '', 450);

    return (
        <input type="search" name="query" placeholder="Etsi..." onInput={onChange} className="shadow-md text-gray-500"/>
    );
}