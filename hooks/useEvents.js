import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function useEvents(){
    const {data, error, isLoading} = useSWR('/api/events/', fetcher);
    return {
        events: data,
        error,
        isLoading,
    }
}