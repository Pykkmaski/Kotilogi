import { useState, useEffect } from "react";
import axios from 'axios';

function useFiles(property_id, event_id){
    const [ids, setIds] = useState([]);

    function loadFiles(){
        axios.get(`/properties/${property_id}/files`)
        .then(res => setIds(res.data))
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        loadFiles();
    }, []);

    return [ids, loadFiles];
}

export default useFiles;