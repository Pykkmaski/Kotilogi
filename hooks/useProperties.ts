import axios from 'axios';
import useSWR from 'swr';
import {useSWRConfig} from 'swr';
import { useState, useEffect } from 'react';

export default function useProperties(owner: string){
    const [properties, setProperties]: any[] = useState([]);
    const [error, setError] = useState(null);

    function update(newData){
        
    }

    async function remove(id: number){
        const removedId = await axios.delete('/api/properties/' + id);
        const newData = [...properties];

        var indexOfRemovedItem: number = 0;
        for(const item of properties){
            if(item.id === removedId){
                indexOfRemovedItem = item.id;
                break;
            }
        }

        newData.splice(indexOfRemovedItem, 1);
        setProperties(newData);
    }

    function load(){
        axios.get('/api/properties/' + owner)
        .then(res => {
            setProperties(res.data);
            setError(null);
        })
        .catch(err => setError(err))
    }

    useEffect(() => {
        load();
    }, []);

    return {
        properties,
        load,
        error,
    }
}