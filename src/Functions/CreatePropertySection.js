import CreateEventsSection from "../Components/PropertyEventsSection";
import CreatePicturesSection from "../Components/PropertyPicturesSection";

function CreatePropertySection(property_id, section){

    return (
        <div id="property-section">
            {
                section === 'events' ? CreateEventsSection(property_id)
                :
                section === 'pictures' ? CreatePicturesSection(property_id)
                :
                null
            }
        </div>
    )
}

export default CreatePropertySection;