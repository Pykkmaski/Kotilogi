import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../scss/RepairHistory.scss';
import AppContext from '../Contexts/AppContext';
import Timeline from './Timeline/Timeline';
import Events from './Timeline/Events';

const historyIcon = './img/history.png';

function RepairHistory(props){

    const [repairHistory, setRepairHistory] = useState([]);
    const [property, setProperty] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(200);

    const {user} = useContext(AppContext);
    const {id} = useParams();

    useEffect(() => {
        const req = new XMLHttpRequest();
        console.log(`Fetching history for property ${id}`);
        req.open('GET', `/property/${id}/repairHistory`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                const data = JSON.parse(req.response);
                console.log(data);
                setRepairHistory([...data]);
                setSelectedYear(data[0].created_at.split(' ')[0].split('-')[0]);
            }
            else{
                setError(req.status);
            }
        }

        const propertyReq = new XMLHttpRequest();
        propertyReq.open('GET', `/property/${id}`, true);
        propertyReq.setRequestHeader('Auth', user.token);
        propertyReq.send();

        propertyReq.onload = () => {
            if(propertyReq.status === 200){
                const data = JSON.parse(propertyReq.response);
                setProperty(data);
            }
            else{
                console.log(propertyReq.status);
            }
        }

    }, []);

    return (
        <div id="repair-history-page">
            <div id="timeline-container">
                <Timeline history={repairHistory} setSelectedYear={setSelectedYear}/>
                <Link to={`/property/${id}/events/add`} className="block-button">Lisää Uusi Tapahtuma</Link>
            </div>
            
            {
                repairHistory.length ? <Events history={repairHistory} selectedYear={selectedYear}/> : null
            }
            
        </div>
    );
}

export default RepairHistory;