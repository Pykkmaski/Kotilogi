import { useState, useEffect } from "react";
import axios from 'axios';

function usePropertyFiles(property_id){
    const [ids, setIds] = useState([]);

    function loadFiles(){
        axios.get(`/api/files/properties/${property_id}`)
        .then(res => setIds(res.data))
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        loadFiles();
    }, []);

    return [ids, loadFiles];
}

export default usePropertyFiles;