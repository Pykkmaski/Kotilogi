import Card from './Card';
import Button from '../Buttons/Button';

function PropertyCard({property, editing, functions}){

    const propertyMainImage = `/api/images/properties/${property.id}/main`;
    return (
        <Card>
            <Card.Image
                src={propertyMainImage}
                loading="lazy"
            />
            
            <Card.Body>
                <Card.Title>{property.address}</Card.Title>
                <div className="card-text">{property.description}</div>
            </Card.Body>

            {
                editing ? 
                <Card.Footer>
                    <Button className="danger" onClick={() => functions.deleteProperty(property.id)}>Poista</Button>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    );
}

export default PropertyCard;