import {useState, useEffect} from 'react';
import axios from 'axios';

function useProperties(){
    const [properties, setProperties] = useState(null);

    function loadProperties(){
        //Implicitly fetches the properties belonging to the logged in user, by verifying the authorization token sent in the header.
        const url = `/properties/`;
        axios.get(url)
        .then(res => setProperties(res.data))
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
       loadProperties();
    }, []);

    return [properties, loadProperties];
}

export default useProperties;