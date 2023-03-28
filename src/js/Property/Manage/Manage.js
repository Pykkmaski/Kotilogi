import '../../../scss/Property.scss';
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import AppContext from '../../Contexts/AppContext';
import Loading from '../../Loading/Loading.js';
import { serverTimeoutMessage } from "../../appconfig";

const homeIcon = './img/house.png';
const cogIcon = './img/settings.png';
const boltIcon = './img/bolt.png';
const historyIcon = './img/history.png';
const userIcon = './img/user.png';
const imageIcon = './img/image.png';
function Manage(props){

    const {id} = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState('');

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
        <div className="page" id="property-manage-page">

            <div className="grid-item">
                <header>
                    <h1>{property.address}</h1>
                </header>

                <Link to="" className="button-link">
                    <img src={homeIcon}></img>
                    <span>Vituaalitalo</span>
                </Link>

                <Link to={`/property/${id}/repairHistory`} className="button-link">
                    <img src={historyIcon}></img>
                    <span>Korjaushistoria</span>
                </Link>

                <Link to={`/property/${id}/energy`} className="button-link">
                    <img src={boltIcon}></img>
                    <span>Kulutus</span>    
                </Link>

                <Link to="" className="button-link">
                    <img src={userIcon}></img>
                    <span>Omistus</span>
                </Link>

                <Link to="" className="button-link">
                    <img src={imageIcon}></img>
                    <span>Kuvat</span>
                </Link>

                <Link to="" className="button-link">   
                    <img src={cogIcon}></img> 
                    <span>Työkalut</span>
                </Link>
            </div>
            
        </div>
    );
}

export default Manage;