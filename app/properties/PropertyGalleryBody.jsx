import { useItemGalleryContext } from "kotilogi-app/contexts/ItemGalleryContext";
import PropertyCard from "./PropertyCard";
import NoProperties from "./NoProperties";

export default function PropertyGalleryBody(props){
    const {items} = useItemGalleryContext();

    return (
        <div className="gallery-body">
            {   
                items.length ?
                items.map(item => {
                    return <PropertyCard property={item} image={{id: 100}}/>
                })
                :
                <NoProperties/>
            }
        </div>
    );
}