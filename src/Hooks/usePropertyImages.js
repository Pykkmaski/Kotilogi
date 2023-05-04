import axios from "axios";
import { useEffect, useState } from "react";

function usePropertyImages(property_id){
    const [images, setImages] = useState([]);

    function loadImages(){
        axios.get(`/api/images/properties/${property_id}`)
        .then(res => setImages(res.data))
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        loadImages();
    }, [property_id]);

    return [images, loadImages];
}

export default usePropertyImages;