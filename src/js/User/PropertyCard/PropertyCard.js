import './Style.scss';
import {Link} from 'react-router-dom';
const homeIcon = './img/home-icon.png';

function PropertyCard({content}){

    return (
        <Link to={`/property/${content}`} className="property-card">
            <h1>{content}</h1>
        </Link>
    );
}

export default PropertyCard;