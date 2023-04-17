import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Style.scss';
import AppContext from '../Contexts/AppContext';
import Timeline from './Timeline/Timeline';
import Events from './Timeline/Events';
import TimelineContext from '../Contexts/TimelineContext';

const historyIcon = './img/history.png';

function RepairHistory(props){

    const [repairHistory, setRepairHistory] = useState([]);
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
                setRepairHistory([...data]);

                const year = data[0].date.split('-')[0];
                setSelectedYear(year);
            }
            else{
                setError(req.status);
            }

            setLoading(false);
        }

    }, []);

    return (
        <div id="repair-history-page">
            <div id="timeline-container">
                <TimelineContext.Provider value={{setSelectedYear, selectedYear, history: repairHistory, loading}}>
                    <Timeline history={repairHistory} setSelectedYear={setSelectedYear} loading={loading}/>
                    <Link to={`/property/${id}/events/add`} className="block-button" id="add-event-button">Lisää Uusi Tapahtuma</Link>
                </TimelineContext.Provider>
                
            </div>
            
            {
                repairHistory.length ? <Events history={repairHistory} selectedYear={selectedYear}/> : null
            }
            
        </div>
    );
}

export default RepairHistory;