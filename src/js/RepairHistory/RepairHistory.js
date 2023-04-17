import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Style.scss';
import AppContext from '../Contexts/AppContext';
import Events from './Timeline/Events';
import Loading from '../Loading/Loading';
const historyIcon = './img/history.png';

function RepairHistory(props){

    const [events, setEvents] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(200);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AppContext);
    const {id} = useParams();

    //Fetch all events for this property.
    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('GET', `/property/${id}/events`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                const data = JSON.parse(req.response);
                setEvents([...data]);

                const year = data[0].date.split('-')[0];
                setSelectedYear(year);
            }
            else{
                setError(req.status);
            }

            setLoading(false);
        }

    }, []);

    if(loading) return <Loading message="Ladataan tapahtumia..."/>

    return (
        <div id="repair-history-page">
            <Events history={events}/>
        </div>
    );
}

export default RepairHistory;