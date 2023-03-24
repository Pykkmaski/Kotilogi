import { useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AccessDenied from '../AccessDenied/AccessDenied';
import AppContext from '../Contexts/AppContext';
import PropertyCard from './PropertyCard/PropertyCard';
import './Style.scss';

function User(props){

    const [properties, setProperties] = useState([]);
    const {user} = useContext(AppContext);

    useEffect(() => {
        if(!user) return;
        const req = new XMLHttpRequest();
        req.open('GET', `/property/all/${user.username}`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                setProperties(JSON.parse(req.response));
            }
            else{
                console.log(req.response);
            }
        }
    }, []);

    if(!user) return <AccessDenied/>;

    return (
        <div className="page" id="user-page">
            {
                !properties.length ? <div id="welcome-text">
                    <h1>Tervetuloa Digikoti Palveluun!</h1>
                    <h2>Aloita Lisäämällä Uusi Talo</h2>
                </div>

                : 

                <div id="property-grid">
                    {
                        properties.map(item => {
                            return(
                                <PropertyCard content={item.address}/>
                            )
                        })
                    }
                </div>
            }
            

            <Link to="/addProperty" id="add-property-button">Lisää Talo</Link>
        </div>
    );
}

export default User;