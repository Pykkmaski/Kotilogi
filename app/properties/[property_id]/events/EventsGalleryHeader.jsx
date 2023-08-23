import axios from "axios";
import { useItemGalleryContext } from "kotilogi-app/contexts/ItemGalleryContext";
import { usePropertyContext } from "kotilogi-app/contexts/PropertyProvider";

export default function EventsGalleryHeader(props){
    
    const {deleteItems, selectedItems, items, setItems, addItem, loading} = useItemGalleryContext();
    const {property} = usePropertyContext();

    async function addEvent(){
        const newEvent = {
            name: 'TestEvent ' + items.length,
            description: 'Placeholder event for testing purposes.',
            property_id: property.id,
        }

        const postedEvent = await axios.post('/api/events', newEvent);
        setItems(prev => [...prev, postedEvent]);
    }

    return (
        <div className="gallery-header">
            <div>
                <h1>{property.address}</h1>
                <small>Tapahtumat</small>
            </div>

            <div className="group-row">
                <button type="button" className="primary" onClick={() => deleteItems(...selectedItems)} disabled={selectedItems.length === 0}>Poista</button>
                <button type="button" className="primary add" onClick={() => addItem(addEvent)}>Lisää Uusi</button>
            </div>
        </div>
    );
}