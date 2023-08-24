import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function useEvents(eventId){
    const {data, error, isLoading} = useSWR('/api/events/' + eventId, fetcher);
    return {
        event: data,
        error,
        isLoading,
    }
}