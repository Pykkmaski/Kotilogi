import './Style.scss';
import {Link} from 'react-router-dom';
const homeIcon = './img/home-icon.png';

function PropertyCard({property}){

    return (
        <Link to={`/property/${property.id}/info`} className="button-link">
            <img src={homeIcon}/>
            <h1>{property.address}</h1>
        </Link>
    );
}

export default PropertyCard;