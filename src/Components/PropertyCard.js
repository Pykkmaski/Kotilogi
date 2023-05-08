import Card from '../Components/Card';

function PropertyCard({property}){

    const propertyMainImage = `/api/images/properties/${property.id}/main`;
    return (
        <Card>
            <Card.Image
                src={propertyMainImage}
                loading="lazy"
                onError={(e) => {
                    e.target.src = './img/no-pictures.png';
                }}
            />
            
            <Card.Body>
                <div className="card-title">{property.address}</div>
                <div className="card-text">{property.description}</div>

                <div className="card-button-group">
                    <button className="primary" onClick={() => location.assign(`/#/properties/${property.id}/info`)}>Avaa</button>
                    <button className="secondary">Poista</button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PropertyCard;