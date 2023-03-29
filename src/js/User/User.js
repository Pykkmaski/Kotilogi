import { useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import AccessDenied from '../AccessDenied/AccessDenied';
import AppContext from '../Contexts/AppContext';
import PropertyCard from './PropertyCard/PropertyCard';
import '../../scss/User.scss';

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
                const newProperties = JSON.parse(req.response);
                setProperties(newProperties);
            }
            else{
                console.log(req.response);
            }
        }
    }, [user]);

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
                                <PropertyCard property={item} key={item.id}/>
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