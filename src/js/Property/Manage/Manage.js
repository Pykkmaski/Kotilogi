import '../../../scss/Property.scss';
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import AppContext from '../../Contexts/AppContext';
import Loading from '../../Loading/Loading.js';
import RepairHistory from '../../RepairHistory/RepairHistory';
import Info from '../Info/Info';
import { serverTimeoutMessage } from "../../appconfig";

const homeIcon = './img/house.png';
const cogIcon = './img/settings.png';
const boltIcon = './img/bolt.png';
const historyIcon = './img/history.png';
const userIcon = './img/user.png';
const imageIcon = './img/image.png';
const infoIcon = './img/info.png';

function Manage(props){

    const {id} = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState('');
    const [selection, setSelection] = useState('info');
    const [repairVisible, setRepairVisible] = useState(true);

    const {user} = useContext(AppContext);

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('GET', `property/${id}`, true);
        req.setRequestHeader('Auth', user.token);

        req.send();

        req.timeout = 4000;

        req.ontimeout = () => {
            setError(serverTimeoutMessage["fi"]);
            console.log(error);
        }

        req.onload = () => {
            if(req.status === 200){
                const data = JSON.parse(req.response);
                setProperty(data);
            }
            else{
                console.log(req.response, req.status)
                setError(req.response);
            }
        }
    }, []);

    if(property === null) return <Loading message="Ladataan taloa..."/>

    return (
        <div className="page management-page">
            <div className="grid-item-left">
                <header>
                    <h1>{property.address}</h1>
                </header>

                <Link className="button-link" onClick={() => setSelection('info')}>
                    <img src={infoIcon}></img>
                    <span>Tiedot</span>
                </Link>
                <Link to="" className="button-link" onClick={() => setSelection('virtualhouse')}>
                    <img src={homeIcon}></img>
                    <span>Vituaalitalo</span>
                </Link>

                <Link className="button-link" onClick={() => setSelection('repairs')}>
                    <img src={historyIcon}></img>
                    <span>Korjaushistoria</span>
                </Link>

                <Link className="button-link" onClick={() => setSelection('energyusage')}>
                    <img src={boltIcon}></img>
                    <span>Kulutus</span>    
                </Link>

                <Link to="" className="button-link" onClick={() => setSelection('owners')}>
                    <img src={userIcon}></img>
                    <span>Omistus</span>
                </Link>

                <Link to="" className="button-link" onClick={() => setSelection('pictures')}>
                    <img src={imageIcon}></img>
                    <span>Kuvat</span>
                </Link>

                <Link to="" className="button-link" onClick={() => setSelection('settings')}>   
                    <img src={cogIcon}></img> 
                    <span>Työkalut</span>
                </Link>
            </div>

            <div className="grid-item-right">
                <header>
                    <h1>
                        {
                            selection === 'info' ? 
                            'Tiedot'
                            :
                            selection === 'repairs' ? 
                            'Korjaushistoria'
                            :
                            selection === 'virtualhouse' ? 
                            'Virtuaalitalo'
                            :
                            selection === 'energyusage' ?
                            'Kulutus'
                            :
                            selection === 'owners' ? 
                            'Omistajat'
                            :
                            selection === 'settings' ?
                            'Asetukset'
                            :
                            selection === 'pictures' ? 
                            'Kuvat'
                            :
                            null
                        }
                    </h1>
                </header>

                {
                    selection === 'info' ? 
                    <Info property={property}/>
                    :
                    selection === 'repairs' ? 
                    <RepairHistory/>
                    :
                    null
                }
            </div>
            
        </div>
    );
}

export default Manage;