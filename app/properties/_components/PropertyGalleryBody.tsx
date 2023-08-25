import ItemCard, {ItemType} from "kotilogi-app/components/Cards/ItemCard";
import NoProperties from 'kotilogi-app/components/Error/NoProperties';

export default function PropertyGalleryBody({properties}){
    return (
        <div className="gallery-body">
            {   
                properties.length ?
                properties.map(property => {

                    const item: ItemType = {
                        title: property.address,
                        description: property.description,
                        id: property.id,
                    }

                    return <ItemCard item={item} destinationUrl={`/properties/${item.id}/info`} imageUrl={'/'}/>
                })
                :
                <NoProperties/>
            }
        </div>
    );
}