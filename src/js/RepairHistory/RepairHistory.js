import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../scss/RepairHistory.scss';
import AppContext from '../Contexts/AppContext';
import Timeline from './Timeline/Timeline';

const historyIcon = './img/history.png';

function RepairHistory(props){

    const [repairHistory, setRepairHistory] = useState([]);
    const {user} = useContext(AppContext);
    const {propertyId} = useParams();

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('GET', `/property/${propertyId}/repairHistory`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                const data = JSON.parse(req.response);
                setRepairHistory(data);
            }
            else{
                console.log(req.response);
            }
        }

    }, []);

    return (
        <div className="page management-page" id="repair-history-page">
            <div className="grid-item">
                <header className="page-title">
                    <h1>Korjaushistoria</h1>
                </header>
            </div>

            <div className="grid-item" id="timeline-section">
                <Timeline length={5}/>
            </div>
        </div>
    );
}

export default RepairHistory;