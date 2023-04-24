import CreateEventsSection from "./CreateEventsSection";

function CreatePropertySection({property_id, section}){

    return (
        <div id="property-section">
            {
                section === 'events' ? CreateEventsSection(property_id)
                :
                null
            }
        </div>
    )
}

export default CreatePropertySection;