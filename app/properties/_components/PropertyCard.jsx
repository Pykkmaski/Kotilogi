"use client";

import Card from "kotilogi-app/components/Cards/Card";
import {useState, useEffect} from 'react';
import Link from 'next/link';

export default function PropertyCard({property, image}){
    const [selected, setSelected]                  = useState(false);
    const [menuOpen, setMenuOpen]                  = useState(false);

    function checkboxHandler(e){
        setSelected(prev => !prev);
    }

    /*
    useEffect(() => {
        setSelected(selectedItems.includes(property.id));
    }, [selectedItems]);
    */

    return (
        <Card className={selected ? 'selected' : null}>
            <Link href={`/properties/${property.id}/info`}>
                <Card.Body>
                    <Card.Image src={undefined}></Card.Image>
                    <Card.Title>{property.address}</Card.Title>
                    <div className="card-text">{property.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onChange={checkboxHandler} checked={selected}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen((prev) => !prev)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen}>
                <nav>
                    <span onClick={undefined}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}