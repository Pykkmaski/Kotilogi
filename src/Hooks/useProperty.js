import {useState, useEffect} from 'react';
import axios from 'axios';

function useProperty(property_id){
    const [property, setProperty] = useState(null);

    function loadProperty(){
        const url = `/api/properties/${property_id}`;
        axios.get(url)
        .then(res => setProperty(res.data))
        .catch(err => {
            const none = null;
            setProperty(none);
        })
    }

    useEffect(() => {
        loadProperty();
    }, []);
    
    return [property, loadProperty];
}

export default useProperty;