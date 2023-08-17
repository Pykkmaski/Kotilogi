import Card from "./Card";
import {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import PropertiesGalleryContext from "../../Contexts/PropertiesGalleryContext";

export function PropertyCard({property}){
    const {deleteProperties, selectProperty, selectedProperties} = useContext(PropertiesGalleryContext);
    const [selected, setSelected] = useState(selectedProperties.includes(property.id));
    const [menuOpen, setMenuOpen] = useState(false);
    const propertyMainImage = '/api/images/properties/' + property.id + '/main';

    function checkboxHandler(e){
        console.log('Checkbox changed');
        const newState = !selected;
        setSelected(newState);
        selectProperty(property.id);
    }

    useEffect(() => {
        setSelected(selectedProperties.includes(property.id));
    }, [selectedProperties]);

    return (
        <Card className={selected ? 'selected' : null}>
            <Link to={`/properties/${property.id}/info`}>
                <Card.Image src={propertyMainImage} loading="lazy"></Card.Image>
                <Card.Body>
                    <Card.Title>{property.address}</Card.Title>
                    <div className="card-text">{property.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler} checked={selected}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen}>
                <nav>
                    <span onClick={() => deleteProperties(property.id)}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}