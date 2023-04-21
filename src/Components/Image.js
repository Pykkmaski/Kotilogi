import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function Image(props){

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    function loadImage(){
        setLoading(true);
        axios.get(props.sourceUrl).then(res => {
            setImage(res.data);
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
    });

    if(loading) return <Spinner/>

    return (
        <img src={image}/>
    );
}

export default Image;