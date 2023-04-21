import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function ImageElement(props){

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    function loadImage(){
        setLoading(true);
        axios.get(props.sourceUrl).then(res => {
            setImage(new Image(res.data));
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        loadImage();
    }, []);

    if(loading) return <Spinner/>

    return (
       <img src={props.srcUrl}/>
    );
}

export default ImageElement;