import axios from "axios";
import { useEffect, useState } from "react";

function useEventImages(event_id){
    const [images, setImages] = useState([]);

    function loadImages(){
        axios.get(`/api/images/events/${event_id}`)
        .then(res => setImages(res.data))
        .catch(err => {
            const empty = [];
            setImages(empty);
        });
    }

    useEffect(() => {
        loadImages();
    }, [event_id]);

    return [images, loadImages];
}

export default useEventImages;