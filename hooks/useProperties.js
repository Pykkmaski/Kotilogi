import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

function useProperties(username){
    const [properties, setProperties] = useState([]);

    function loadProperties(){
        const url = `/api/properties/user/${username}`;
        axios.get(url)
        .then(res => {
            console.log(res.data.response);
        })
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