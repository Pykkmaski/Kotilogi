import Card from './Card';

function PropertyCard({property}){

    const propertyMainImage = `/api/images/properties/${property.id}/main`;
    return (
        <Card>
            <Card.Image
                src={propertyMainImage}
                loading="lazy"
            />
            
            <Card.Body>
                <div className="card-title">{property.address}</div>
                <div className="card-text">{property.description}</div>

                
            </Card.Body>

            <Card.Footer>
                <div className="card-button-group">
                    <button className="primary" onClick={() => location.assign(`/#/properties/${property.id}/info`)}>Avaa</button>
                    <button className="secondary">Poista</button>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default PropertyCard;