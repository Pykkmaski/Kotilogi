import {useState, useEffect} from 'react';
import axios from 'axios';

function useProperty(property_id){
    const [property, setProperty] = useState(null);

    function loadProperty(){
        const url = `/properties/${property_id}`;
        axios.get(url)
        .then(res => setProperty(res.data))
        .catch(err => console.log(err.message))
    }

    useEffect(() => {   
        loadProperty();
    }, []);

    return [property, loadProperty];
}

export default useProperty;