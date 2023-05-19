import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function useUsage(property_id){
    const [usage, setUsage] = useState(null);

    function loadUsage(){
        axios.get(`/api/usage/${property_id}`)
        .then(res => {
            setUsage(res.data);
        })
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
       loadUsage();
    }, [property_id]);

    return [usage, loadUsage]
}

export default useUsage;