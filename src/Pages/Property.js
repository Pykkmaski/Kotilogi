import { useParams } from "react-router-dom";
import PropertyEventsSection from "../Components/PropertyEventsSection";
import PropertyPicturesSection from "../Components/PropertyPicturesSection";
import PropertyFilesSection from '../Components/PropertyFilesSection';
import PropertyInfoSection from "../Components/PropertyInfoSection";

function Property(props){
    const {property_id, section} = useParams();

    return (
        <div id="property-page" className="px-10 h-100">
            <div id="property-page-nav" className="px-5 border-right">
                <nav className="d-flex flex-column gap-1 pt-5">
                    <a className="cursor-pointer" href={`/#/properties/${property_id}/info`}>Tiedot</a>
                    <a className="cursor-pointer" href={`/#/properties/${property_id}/events`}>Tapahtumat</a>
                    <a className="cursor-pointer" href={`/#/properties/${property_id}/energy`}>Kulutus</a>
                    <a className="cursor-pointer" href={`/#/properties/${property_id}/pictures`}>Kuvat</a>
                    <a className="cursor-pointer" href={`/#/properties/${property_id}/files`}>Tiedostot</a>
                    <a className="cursor-pointer">Poista Talo</a>
                </nav>
            </div>

            <div id="property-page-content">
                {
                    section === 'info' ? <PropertyInfoSection property_id={property_id}/>
                    :
                    section === 'events' ? <PropertyEventsSection property_id={property_id}/>
                    :
                    section === 'pictures' ? <PropertyPicturesSection property_id={property_id}/>
                    :
                    section === 'files' ? <PropertyFilesSection property_id={property_id}/>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Property;