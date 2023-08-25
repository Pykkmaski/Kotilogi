"use client";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import ItemCard, {ItemType} from 'kotilogi-app/components/Cards/ItemCard';
import ItemError from 'kotilogi-app/components/Gallery/Error';
import errorImage from 'kotilogi-app/assets/no-pictures.png';

function GalleryHeader(){
    const {property} = usePropertyProvider();

    return (
        <div className="gallery-header">
            <div>
                <h1>{property.address}</h1>
                <small>Tiedostot</small>
            </div>

            <div className="group-row">
                <button type="button" className="secondary">Poista</button>
                <button type="button" className="primary add">Lisää Uusi</button>
            </div>
        </div>
    )
}

function GalleryBody({images}){
    return (
        <div className="gallery-body">
            {
                images.length ? 
                images.map(image => {
                    const item: ItemType = {
                        id: image.id,
                        title: image.title,
                        description: image.description,
                    }

                    return <ItemCard item={item} destinationUrl={'/api/images/' + item.id} imageUrl={'/'}/>
                })
                :
                <ItemError title="Ei Kuvia" message="Talosi ei vielä sisällä kuvia." imageUrl={errorImage}/>
            }
        </div>
    )
}
export default function PropertyFilesGallery({images}){
    return (
        <div className="gallery">
            <GalleryHeader/>
            <GalleryBody images={images}/>
        </div>
    )
}