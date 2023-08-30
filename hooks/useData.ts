import axios from 'axios';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function useData(apiRoute: string){
    const {data, error, isLoading} = useSWR(apiRoute, fetcher);
    const {mutate} = useSWRConfig();

    const updateData = (newData: any) => {
        mutate(apiRoute, newData, true);
    }

    const deleteData = (id: number) => {
        const newData = [...data];
        const item = newData.filter(i => i.id === id);
        if(!item) return;

        newData.splice(newData.indexOf(item), 1);
        mutate(newData);
    }

    const postData = (newData: any) => {
        mutate(apiRoute, newData, true);
    }

    return {
        data,
        error,
        isLoading,

        deleteData,
        updateData,
    }
}