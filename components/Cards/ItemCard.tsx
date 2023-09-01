"use client";

import Card from "./Card";
import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { StaticImageData } from "next/image";
import Spinner from "../Spinner/Spinner";
import CardImage from 'kotilogi-app/assets/house.png';
import { IdType } from "kotilogi-app/types/IdType";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";

export type ItemType = {
    id: string,
    title: string,
    description?: string,
}

export type ItemCardProps = {
    item: ItemType,
    destinationUrl: string,
    imageUrl: string | StaticImageData,
    key: number,
}

export default function ItemCard({item, destinationUrl, imageUrl, key}: ItemCardProps){
    const {selectedItems, toggleSelected} = useGallery();
    const [selected, setSelected] = useState(selectedItems.includes(item.id));
    const [menuOpen, setMenuOpen] = useState(false);
    const propertyMainImageUrl = imageUrl;

    function checkboxHandler(e){
        toggleSelected(item.id);
    }
    
    useEffect(() => {
        setSelected(selectedItems.includes(item.id));
    }, [selectedItems]);

    return (
        <Card className={selected ? 'selected' : null} key={key}>
            <Link href={destinationUrl}>
                <Card.Image src={CardImage}></Card.Image>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler} checked={selected} defaultChecked={false}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>
               
            <Card.Menu open={menuOpen} id={undefined}>
                <nav>
                    <span onClick={(e) => serverDeleteDataByIds([item.id], 'properties_perse')}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}