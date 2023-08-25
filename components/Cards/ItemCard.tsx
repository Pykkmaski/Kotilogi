"use client";

import Card from "./Card";
import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { StaticImageData } from "next/image";

export type ItemType = {
    id: number,
    title: string,
    description?: string,
}

export type ItemCardProps = {
    item: ItemType,
    destinationUrl: string,
    imageUrl: string | StaticImageData,
}

export default function ItemCard({item, destinationUrl, imageUrl}: ItemCardProps){
    const {selectedItems, toggleSelected} = useGallery();
    const [selected, setSelected] = useState(selectedItems.includes(item.id));
    const [menuOpen, setMenuOpen] = useState(false);
    const propertyMainImageUrl = imageUrl;

    function checkboxHandler(e){
        toggleSelected(item.id);
    }
    
    useEffect(() => {
        console.log('ItemCard: Selected items changed');
        setSelected(selectedItems.includes(item.id));
    }, [selectedItems]);

    return (
        <Card className={selected ? 'selected' : null}>
            <Link href={destinationUrl}>
                <Card.Image src={propertyMainImageUrl}></Card.Image>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <div className="card-text">{item.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler} checked={selected}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen} id={undefined}>
                <nav>
                    <span onClick={undefined}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}