import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useChangeInput } from "./useChangeInput";
import { useEffect } from "react";
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

    const {data, updateData} = useInputData({query: initialQueryValue});

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentQuery = new URLSearchParams(searchParams);
            currentQuery.set(queryParamName, data.query);
            router.push(route + `?${currentQuery.toString()}`);
        }, queryDelay);

        return () => clearTimeout(timeout);
    }, [data.query]);

    return {onChange: updateData};
}