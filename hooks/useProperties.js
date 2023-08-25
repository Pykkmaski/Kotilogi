import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function useProperties(userId){
    const {data, error, isLoading, mutate: mutateList} = useSWR('/api/properties/owner/' + userId, fetcher);
    
    return {
        properties: data,
        error,
        isLoading,

    }
}