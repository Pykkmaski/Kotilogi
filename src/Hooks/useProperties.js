import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AppContext from '../Contexts/AppContext';

function useProperties(email){
    const [properties, setProperties] = useState([]);

    function loadProperties(){
        const url = `/api/properties/user/${email}`;
        axios.get(url)
        .then(res => setProperties(res.data))
        .catch(err => {
            const empty = [];
            setProperties(empty);
            console.log(err);
        });
    }

    useEffect(() => {
       loadProperties();
    }, []);

    return [properties, loadProperties];
}

export default useProperties;