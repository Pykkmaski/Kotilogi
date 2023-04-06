import { useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import AccessDenied from '../AccessDenied/AccessDenied';
import AppContext from '../Contexts/AppContext';
import PropertyCard from './PropertyCard/PropertyCard';
import Loading from '../Loading/Loading';
import './Style.scss';

function User(props){

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
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

            setLoading(false);
        }
    }, [user]);

    if(!user) return <AccessDenied/>;
    if(loading) return <Loading message="Ladataan Taloja..."/>

    return (
        <div className="page" id="user-page">
            {
                !properties.length ? <>
                    <PropertyCard addButton={true}/>
                    <div id="welcome-text">
                        <h1>Tervetuloa Digikoti Palveluun!</h1>
                        <h2>Aloita Lisäämällä Uusi Talo</h2>
                    </div>
                </>

                : 

                <div id="property-grid" className={properties.length < 3 ? 'as-flexbox' : 'as-grid'}>
                    <PropertyCard addButton={true}/>
                    {
                        properties.map(item => {
                            return(
                                <PropertyCard property={item} key={item.id}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}

export default User;