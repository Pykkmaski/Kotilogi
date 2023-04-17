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
        <div className="property-grid-item add hover-effect flex-column center-align gap-m padding-l" onClick={() => linkTo('/property/add')}>
            <img className="property-grid-item-plus" src={plusIcon}></img>
            <h2>Lisää Uusi Talo</h2>
            <p>
                Aloita lisäämällä talo
            </p>
        </div>
    );

    return (
        <div className="property-grid-item hover-effect flex-column center-align gap-m padding-l" onClick={() => linkTo(`/property/${property.id}/info`)}>
            <img src={homeIcon}/>
            <h2>{property.address}</h2>
        </div>
    );
}

export default PropertyCard;