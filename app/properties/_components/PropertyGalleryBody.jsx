import { useItemGalleryContext } from "kotilogi-app/contexts/GalleryProvider";
import PropertyCard from "./PropertyCard";
import NoProperties from "./NoProperties";
import Spinner from 'kotilogi-app/components/Spinner/Spinner';

export default function PropertyGalleryBody(props){
    const {items, loading} = useItemGalleryContext();
    if(loading) return null;
    
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