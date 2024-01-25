import { usePathname, useRouter } from "next/navigation";
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
    const {data, updateData} = useInputData({query: initialQueryValue});

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(route + `?${queryParamName}=${data.query}`);
        }, queryDelay);

        return () => clearTimeout(timeout);
    }, [data.query]);

    return {onChange: updateData};
}