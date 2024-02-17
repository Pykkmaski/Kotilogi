import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useChangeInput } from "./useChangeInput";
import { useEffect, useState } from "react";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";

/**
 * 
 * @param queryParamName 
 * @returns The onChange function to be used by the input performing the query.
 */
export function useQuery(queryParamName: string, initialQueryValue: string | null, queryDelay: number = 0){
    const router = useRouter();
    const route = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(initialQueryValue);
    
    const updateQuery = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log('Query changed ' + query);
            const currentQuery = new URLSearchParams(searchParams);
            currentQuery.set(queryParamName, query);
            router.push(route + `?${currentQuery.toString()}`);
        }, queryDelay);

        return () => clearTimeout(timeout);
    }, [query]);

    return {updateQuery, currentQuery: query} as const;
}