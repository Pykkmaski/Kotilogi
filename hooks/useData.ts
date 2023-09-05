import { serverGetData } from "kotilogi-app/actions/serverGetData";
import { AcceptedGalleryTypes } from "kotilogi-app/components/Gallery/Types";
import { useEffect, useState } from "react";

export default function useData(dbTableName: string, query: any, onlyOne: boolean): AcceptedGalleryTypes | AcceptedGalleryTypes[] | null{
    const [data, setData] = useState<AcceptedGalleryTypes | AcceptedGalleryTypes[] | null>(null);

    useEffect(() => {
        async function fetchData(): Promise<AcceptedGalleryTypes | AcceptedGalleryTypes[] | null>{
            return await serverGetData(dbTableName, query, onlyOne);
        }

        fetchData()
        .then(data => {
            setData(data || null);
        })
        .catch(err => console.log(err.message));
    }, []);

    return data;
}