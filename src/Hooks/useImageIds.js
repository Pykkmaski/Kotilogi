import axios from "axios";
import { useState, useEffect } from "react";

function useImageIds(event_id){
    const [imageIds, setImageIds] = useState([]);

    function loadImageIds(){
        axios.get(`images/events/${event_id}`)
        .then(res => {
            setImageIds(res.data);
        })
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        loadImageIds();
    }, []);

    return [imageIds, loadImageIds];
}

export default useImageIds;