import {Link} from 'react-router-dom';
const homeIcon = './img/home-icon.png';
const plusIcon = './img/plus.png';

import 'bootstrap/scss/bootstrap.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PropertyCard({property, addButton, setShowModal}){

    function onClickHandler(address){
        if(typeof(address) !== 'string') return;
        const dest = '/#' + address;
        location.assign(dest);
    }

    return (
        <Card style={{width: '18rem'}} className="event-card">
            <Card.Img variant="top" src="/" loading="lazy"/>
            <Card.Body>
                <Card.Title>{property.address}</Card.Title>
                <Card.Text>
                    Puinen talo, rakennettu vuonna nonii-i.
                    Ei tässä tekstissä mitään järkeä ole, 
                    vähä vaan täytestä.
                </Card.Text>

                <Button variant="primary" className="w-100" onClick={() => onClickHandler(`/properties/${property.id}/events`)}>Avaa</Button>
            </Card.Body>
        </Card>
    );
}

export default PropertyCard;