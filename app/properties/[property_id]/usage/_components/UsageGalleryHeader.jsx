import { usePropertyContext } from "kotilogi-app/contexts/PropertyProvider"

export default function UsageGalleryHeader(props){

    const {property} = usePropertyContext();

    return (
        <div className="gallery-header">
            <div>
                <h1>{property.address}</h1>
                <small>Kulutustiedot</small>
            </div>

            <div>
                <button type="button" className="primary add">Lisää Uusi</button>
            </div>
        </div>
    )
}