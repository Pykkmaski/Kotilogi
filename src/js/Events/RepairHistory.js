import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Style.scss';
import AppContext from '../Contexts/AppContext';
import Events from './Timeline/Events';
import Loading from '../Loading/Loading';
import axios from 'axios';

const historyIcon = './img/history.png';

function RepairHistory(props){

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(200);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AppContext);
    const {id} = useParams();

    //Fetch all events for this property.
    useEffect(() => {

        setLoading(true);
        setError(0);

        axios.get(`/property/${id}/events`)
        .then(res => {
            setEvents([...res.data]);
        })
        .catch(err => {
            setError(err.response.status);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if(loading) return <Loading message="Ladataan tapahtumia..."/>

    return (
        <div id="repair-history-page">
            <Events history={events}/>
        </div>
    );
}

export default RepairHistory;