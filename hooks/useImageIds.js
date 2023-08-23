import axios from "axios";
import { useState, useEffect } from "react";

function useImageIds(url){
    const [imageIds, setImageIds] = useState([]);

    function loadImageIds(){
        axios.get(url)
        .then(res => {
            setImageIds(res.data);
        })
        .catch(err => {
            setImageIds([]);
        });
    }

    useEffect(() => {
        loadImageIds();
    }, []);

    return [imageIds, loadImageIds];
}

export default useImageIds;