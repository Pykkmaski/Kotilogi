"use client";

import Card from "./Card";
import {useState, useEffect} from 'react';
import Link from 'next/link';

import {useItemGalleryContext} from "kotilogi-app/contexts/ItemGalleryContext";

export default function PropertyCard({property, image}){
    const {deleteItems, selectItem, selectedItems} = useItemGalleryContext();
    const [selected, setSelected]                  = useState(false);
    const [menuOpen, setMenuOpen]                  = useState(false);
    const cardImage = '/api/images/' + image.id;

    function checkboxHandler(e){
        setSelected(prev => !prev);
        selectItem(property.id);
    }

    useEffect(() => {
        setSelected(selectedItems.includes(property.id));
    }, [selectedItems]);

    return (
        <Card className={selected ? 'selected' : null}>
            <Link href={`/properties/${property.id}/info`}>
                <Card.Body>
                    <Card.Image src={cardImage}></Card.Image>
                    <Card.Title>{property.address}</Card.Title>
                    <div className="card-text">{property.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onChange={checkboxHandler} checked={selected}></input>
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