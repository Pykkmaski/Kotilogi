"use client";

import Card from "./Card";
import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { StaticImageData } from "next/image";
import CardImage from 'kotilogi-app/assets/house.png';
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import useGalleryContext from "../new/Gallery/GalleryBase/GalleryContext";
import serverGetFile from "kotilogi-app/actions/serverGetFile";

export type ItemType = {
    id: string,
    title: string,
    imageId: Kotilogi.IdType,
    description?: string,
}

export type ItemCardProps = {
    item: ItemType,
    destination: string,
    imageId: Kotilogi.IdType
    key: string,
}

export default function ItemCard({item, destination, imageId, key}: ItemCardProps){
    const {state, dispatch} = useGalleryContext();
    const [selected, setSelected] = useState(state.selectedItemIds.includes(item.id));
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        setSelected(state.selectedItemIds.includes(item.id));
    }, [state.selectedItemIds]);

    return (
        <Card className={selected ? 'selected' : null} key={key}>
            <Link href={destination}>
                <Card.Image src={`/api/files/${imageId}?dbTableName`}></Card.Image>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={() => dispatch({type: 'select_id', value: item.id})} checked={selected} defaultChecked={false}></input>
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