import { useItemGalleryContext } from "kotilogi-app/contexts/GalleryProvider";
import EventCard from './EventCard';
import NoEvents from './NoEvents';
import Spinner from "kotilogi-app/components/Spinner/Spinner";

export default function EventsGalleryBody(props){
    const {items, loading} = useItemGalleryContext();

    if(loading) return <Spinner size="3rem" />

    return (
        <div className="gallery-body">
            { 
                items &&  
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