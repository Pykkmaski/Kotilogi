import { useState, useEffect } from "react";
import axios from 'axios';

function useEventFiles(event_id){
    const [ids, setIds] = useState([]);

    function loadFiles(){
        axios.get(`/api/files/events/${event_id}`)
        .then(res => setIds(res.data))
        .catch(err => {
            const empty = [];
            setIds(empty);
        });
    }

    useEffect(() => {
        loadFiles();
    }, []);

    return [ids, loadFiles];
}

export default useEventFiles;