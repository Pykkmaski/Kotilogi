import Card from "../Card/Card";
import useGalleryContext from "./GalleryContext";
import getEntryAsItem from "./getEntryAsItem";

type BodyWithCardsProps = {

}

export default function BodyWithCards(props: BodyWithCardsProps){
    const {state, dbTableName} = useGalleryContext();
    
    const cards = state.data.map((entry, index: number) => {
        const item = getEntryAsItem(entry);
        const destination = dbTableName === 'properties' ? `/auth/properties/${item.id}/info` : '?';
        const imageUrl = "";
        
        return (
            <Card item={item} key={`gallery-card-${index}`} destination={destination} imageUrl={imageUrl}/>
        );
    });

    return (
        <div className="gallery-body">
            {cards}
        </div>
    )
}