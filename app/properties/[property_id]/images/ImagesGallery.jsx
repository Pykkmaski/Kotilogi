"use client";
import { usePropertyContext } from "kotilogi-app/contexts/PropertyProvider";
import ItemGalleryWrapper, { useItemGalleryContext } from "kotilogi-app/contexts/ItemGalleryContext";
import NoImages from './NoImages';

function GalleryHeader({property}){
    return (
        <div className="gallery-header">
            <div>
                <h1>{property.address}</h1>
                <small>Kuvat</small>
            </div>

            <div>
                <button className="primary add" type="button">Lisää Uusi</button>
            </div>
        </div>
    )
}

function GalleryBody(props){
    const {items} = useItemGalleryContext();

    return (
        <div className="gallery-body">
            {
                items ?
                items.map(image => {
                    return null
                })
                :
                <NoImages/>
            }
        </div>
    );
}

export default function ImagesGallery({images}){
    const {property} = usePropertyContext();

    return (
        <ItemGalleryWrapper content={images | []}>
            <div className="gallery">
                <GalleryHeader property={property}/>
                <GalleryBody/>
            </div>
        </ItemGalleryWrapper>
    );
}