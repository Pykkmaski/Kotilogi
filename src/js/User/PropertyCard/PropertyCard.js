import './Style.scss';
import {Link} from 'react-router-dom';
const homeIcon = './img/home-icon.png';
const plusIcon = './img/plus.png';

function PropertyCard({property, addButton}){

    function linkTo(address){
        if(typeof(address) !== 'string') return;
        const dest = '/#' + address;
        location.assign(dest);
    }

    if(addButton) return (
        <div className="property-grid-item add" onClick={() => linkTo('/property/add')}>
            <div className="property-grid-item-plus">
                <img src={plusIcon}></img>
            </div>
        </div>
    );

    return (
        <div className="property-grid-item" onClick={() => linkTo(`/property/${property.id}/info`)}>
            <img src={homeIcon}/>
            <h1>{property.address}</h1>
        </div>
    );
}

export default PropertyCard;