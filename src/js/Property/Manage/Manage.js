import '../../../scss/Property.scss';
import {useParams} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import AppContext from '../../Contexts/AppContext';
import Loading from '../../Loading/Loading.js';

function Manage(props){

    const {id} = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState('');

    const {user} = useContext(AppContext);

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('GET', `property/{id}`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.timeout = 4000;

        req.ontimeout = () => {
            setError('Palvelimen vastauksessa menee liian kauan. Yritä hetken kuluttua uudelleen.');
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
            <header>
                <div id="page-title">
                    <h1>{property.address}</h1>
                </div>
            </header>
        </div>
    );
}

export default Manage;