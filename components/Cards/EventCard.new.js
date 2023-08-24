import Card from "./Card";
import {useContext, useState, useEffect} from 'react';
import Link from 'next/link';

import { useItemGalleryContext } from "kotilogi-app/contexts/GalleryProvider";

export function EventCard({property, event}){
    const [selected, setSelected] = useState(false);
    const {deleteItems, selectItem, selectedItems} = useItemGalleryContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const eventMainImage = '/api/images/events/' + event.id + '/main';

    function checkboxHandler(e){
        console.log('Checkbox changed');
        const newState = !selected;
        setSelected(newState);
        selectItem(event.id);
    }

    useEffect(() => {
        setSelected(selectedItems.includes(event.id));
    }, [selectedItems]);

    return (
        <Card className={selected ? 'selected' : null}>
            <Link href={`/properties/${property.id}/events/${event.id}`}>
                <Card.Image src={eventMainImage} loading="lazy"></Card.Image>
                <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <div className="card-text">{event.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler} checked={selectedItems.includes(event.id)}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen}>
                <nav>
                    <span onClick={() => deleteItems(event.id)}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}