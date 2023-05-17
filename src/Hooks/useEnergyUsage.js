import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function useEnergyUsage(property_id){
    const [usage, setUsage] = useState(null);

    function loadEnergyUsage(){
        axios.get(`/api/energy_usage/${property_id}`, {
            body: {
                property_id
            }
        })
        .then(res => setUsage(res.data))
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
       loadEnergyUsage();
    }, [property_id]);

    return [usage, loadEnergyUsage];
}

export default useEnergyUsage;