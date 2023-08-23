import {useState, useContext} from 'react';
import PropertyContext from '../../Contexts/PropertyContext';
import { EventsGallery } from '../../Components/Gallery/EventsGallery';

function EventsSection(props){
    const {property} = useContext(PropertyContext);

    return (
       <EventsGallery property={property}/>
    );
}

export default EventsSection;