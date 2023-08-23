import { useItemGalleryContext } from "kotilogi-app/contexts/ItemGalleryContext";
import EventCard from './EventCard';
import NoEvents from './NoEvents';

export default function EventsGalleryBody(props){
    const {items} = useItemGalleryContext();

    return (
        <div className="gallery-body">
            {   
                items.length ?
                items.map(item => {
                    return <EventCard event={item} image={{id: 100}}/>
                })
                :
                <NoEvents/>
            }
        </div>
    );
}