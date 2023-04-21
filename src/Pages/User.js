import { useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Unauthorized from './Unauthorized';
import AppContext from '../Contexts/AppContext';
import PropertyCard from '../Components/PropertyCard';
import Loading from './Loading';
import axios from 'axios';

function User(props){

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AppContext);

    useEffect(() => {
        if(!user) return;

        axios.get(`/property/all/`)
        .then(res => {
            setProperties(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            setLoading(false);
        })

    }, [user]);

    if(!user) return <Unauthorized/>;
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
                                <PropertyCard property={item}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}

export default User;