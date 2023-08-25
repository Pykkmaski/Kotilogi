"use client";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import ItemCard, {ItemType} from 'kotilogi-app/components/Cards/ItemCard';
import ItemError from 'kotilogi-app/components/Gallery/Error';
import errorImage from 'kotilogi-app/assets/file.png';

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

function GalleryBody({files}){
    return (
        <div className="gallery-body">
            {
                files.length ? 
                files.map(file => {
                    const item: ItemType = {
                        id: file.id,
                        title: file.title,
                        description: file.description,
                    }

                    return <ItemCard item={item} destinationUrl={'/api/files/' + item.id} imageUrl={'/'}/>
                })
                :
                <ItemError 
                    title="Ei Tiedostoja" 
                    message="Talollesi ei ole vielä lisätty tiedostoja. Tiedostojen lisääminen on vahvasti suositeltua!"
                    imageUrl={errorImage} 
                />
            }
        </div>
    )
}
export default function PropertyFilesGallery({files}){
    return (
        <div className="gallery">
            <GalleryHeader/>
            <GalleryBody files={files}/>
        </div>
    )
}