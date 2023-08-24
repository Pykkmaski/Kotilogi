import Card from "./Card";
import {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import PropertiesGalleryContext, { useItemGalleryContext } from "../../contexts/GalleryProvider";

export function PropertyCard({item, imageUrl}){
    const {deleteItems, selectItem, selectedItems} = useItemGalleryContext();
    const [selected, setSelected] = useState(selectedItems.includes(item.id));

    const [menuOpen, setMenuOpen] = useState(false);
    const propertyMainImage = imageUrl;

    function checkboxHandler(e){
        console.log('Checkbox changed');
        const newState = !selected;
        setSelected(newState);
        selectProperty(item.id);
    }

    useEffect(() => {
        setSelected(selectedItems.includes(item.id));
    }, [selectedItems]);

    return (
        <Card className={selected ? 'selected' : null}>
            <Link to={`/properties/${item.id}/info`}>
                <Card.Image src={propertyMainImage} loading="lazy"></Card.Image>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <div className="card-text">{item.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler} checked={selected}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen}>
                <nav>
                    <span onClick={() => deleteItems(property.id)}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}