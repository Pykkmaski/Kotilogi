import './Style.scss';
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import AppContext from '../../Contexts/AppContext';
import Loading from '../../Loading/Loading.js';
import Events from '../../Events/Events';
import Info from '../Info/Info';
import { serverTimeoutMessage } from "../../appconfig";
import axios from 'axios';

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

        axios.get(`property/${id}`)
        .then(res => {
            setProperty(res.data);
        })
        .catch(err => {
            console.log(err.response.status);
        });
        
    }, []);

    function deleteProperty(){

        const answer = confirm('Olet poistamassa tätä taloa. Oletko varma?');
        if(!answer) return;
        
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
        <div className="page management-page fill" id="property-management-page">
            <div className="grid-item-left bg-white padding-sm fill">
                <header>
                    <h1>{property.address}</h1>
                </header>

                <Link to={`/property/${id}/info`} className="button-link">
                    <img src={infoIcon}></img>
                    <span>Profiili</span>
                </Link>

                <Link  to={`/property/${id}/repairs`} className="button-link">
                    <img src={historyIcon}></img>
                    <span>Korjaushistoria</span>
                </Link>

                <Link to={`/property/${id}/pictures`} className="button-link">
                    <img src={imageIcon}></img>
                    <span>Kuvat</span>
                </Link>

                <Link onClick={deleteProperty} className="button-link">
                    <img src={toiletIcon}></img>
                    <span>Poista</span>
                </Link>
            </div>

            <div className="grid-item-right padding-sm">
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
                    <Events/>
                    :
                    null
                }
            </div>
            
        </div>
    );
}

export default Manage;