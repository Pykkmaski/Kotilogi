import {Link} from 'react-router-dom';
const homeIcon = './img/home-icon.png';
const plusIcon = './img/plus.png';

import 'bootstrap/scss/bootstrap.scss';
import Card from '../Components/Card';
import Button from 'react-bootstrap/Button';

function PropertyCard({property, addButton, setShowModal}){

    function onClickHandler(address){
        if(typeof(address) !== 'string') return;
        const dest = '/#' + address;
        location.assign(dest);
    }
/*
    <Card style={{width: '18rem'}} className="event-card">
            <Card.Img variant="top" src="/" loading="lazy"/>
            <Card.Body>
                <Card.Title>{property.address}</Card.Title>
                <Card.Text>
                    Puinen talo, rakennettu vuonna nonii-i.
                    Ei tässä tekstissä mitään järkeä ole, 
                    vähä vaan täytestä.
                </Card.Text>

                <Button variant="primary" className="w-100" onClick={() => onClickHandler(`/properties/${property.id}/info`)}>Avaa</Button>
            </Card.Body>
        </Card>*/

    const propertyMainImage = `/api/images/properties/${property.id}/main`;
    return (
        <Card>
            <div className="card-image">
                <img
                    src={propertyMainImage}
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = './img/no-pictures.png'
                    }}
                />
            </div>
            
            <div className="card-body">
                <div className="card-title">{property.address}</div>
                <div className="card-text">{property.description}</div>

                <div className="card-button-group">
                    <button className="primary" onClick={() => location.assign(`/#/properties/${property.id}/info`)}>Avaa</button>
                </div>
            </div>
        </Card>
    );
}

export default PropertyCard;