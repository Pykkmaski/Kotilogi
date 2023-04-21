import {Link} from 'react-router-dom';
const homeIcon = './img/home-icon.png';
const plusIcon = './img/plus.png';

import 'bootstrap/scss/bootstrap.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PropertyCard({property, addButton}){

    function onClickHandler(address){
        if(typeof(address) !== 'string') return;
        const dest = '/#' + address;
        location.assign(dest);
    }

    if(addButton) return (
        <Card style={{width: '18rem', borderStyle: 'dashed'}}>
            <Card.Img variant="top" src={'/'}/>
            <Card.Body>
                <Card.Title>Tervetuloa Kotilogiin!</Card.Title>
                <Card.Text>
                    Aloita lisäämällä uusi talo
                </Card.Text>
                <Button variant="primary">Lisää Uusi</Button>
            </Card.Body>
        </Card>
    );

    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="/"/>
            <Card.Body>
                <Card.Title>{property.address}</Card.Title>
                <Card.Text>
                    Puinen talo, rakennettu vuonna nonii-i.
                    Ei tässä tekstissä mitään järkeä ole, 
                    vähä vaan täytestä.
                </Card.Text>

                <Button variant="primary" className="w-100" onClick={() => onClickHandler(`/property/${property.id}`)}>Avaa</Button>
            </Card.Body>
        </Card>
    );
}

export default PropertyCard;