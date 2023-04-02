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
const toiletIcon = './img/toilet.png';

function Manage(props){

    const {id, section} = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState('');
    const [selection, setSelection] = useState(section);
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

    function deleteProperty(){
        const req = new XMLHttpRequest();
        req.open('DELETE', `/property/${id}`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                location.assign('/#/user');
            }
            else{
                console.log('Property deletion failed!');
            }
        }
    }

    if(property === null) return <Loading message="Ladataan taloa..."/>

    return (
        <div className="page management-page">
            <div className="grid-item-left">
                <header>
                    <h1>{property.address}</h1>
                </header>

                <Link to={`/property/${id}/info`} className="button-link">
                    <img src={infoIcon}></img>
                    <span>Profiili</span>
                </Link>

                <Link  to={`/property/${id}/virtualhouse`} className="button-link">
                    <img src={homeIcon}></img>
                    <span>Vituaalitalo</span>
                </Link>

                <Link  to={`/property/${id}/repairs`} className="button-link">
                    <img src={historyIcon}></img>
                    <span>Korjaushistoria</span>
                </Link>

                <Link to={`/property/${id}/energyusage`} className="button-link">
                    <img src={boltIcon}></img>
                    <span>Kulutus</span>    
                </Link>

                <Link  to={`/property/${id}/owners`} className="button-link">
                    <img src={userIcon}></img>
                    <span>Omistus</span>
                </Link>

                <Link to={`/property/${id}/pictures`} className="button-link">
                    <img src={imageIcon}></img>
                    <span>Kuvat</span>
                </Link>

                <Link  to={`/property/${id}/settings`} className="button-link">   
                    <img src={cogIcon}></img> 
                    <span>Asetukset</span>
                </Link>

                <Link onClick={deleteProperty} className="button-link">
                    <img src={toiletIcon}></img>
                    <span>Poista</span>
                </Link>
            </div>

            <div className="grid-item-right">
                <header>
                    <h1>
                        {
                            section === 'info' ? 
                            'Profiili'
                            :
                            section === 'repairs' ? 
                            'Korjaushistoria'
                            :
                            section === 'virtualhouse' ? 
                            'Virtuaalitalo'
                            :
                            section === 'energyusage' ?
                            'Kulutus'
                            :
                            section === 'owners' ? 
                            'Omistajat'
                            :
                            section === 'settings' ?
                            'Asetukset'
                            :
                            section === 'pictures' ? 
                            'Kuvat'
                            :
                            null
                        }
                    </h1>
                </header>

                {
                    section === 'info' ? 
                    <Info property={property}/>
                    :
                    section === 'repairs' ? 
                    <RepairHistory/>
                    :
                    null
                }
            </div>
            
        </div>
    );
}

export default Manage;