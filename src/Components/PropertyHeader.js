function PropertyHeader(props){

    const {property, loadProperty} = props;

    return (
        <header className="d-flex flex-column w-100 gap-1 p-3 bg-gray justify-content-center">
            <div id="property-header-back-link-container" className="justify-content-left">
                <button onClick={() => location.assign(`/#/property/${property.id}/events`)}>Takaisin Taloon</button>
            </div>

            <div id="property-header-body" className="d-flex flex-row gap-1">
                <div className="event-header-image-container">
                    <img id="property-main-image" src={CreateImageUrl({main: true, property_id: property.id})}/>
                </div>

                <div className="event-header-info-container p-1 d-flex flex-column">
                    <div id="property-header-info-body" className="d-flex flex-column gap-1 fill">
                        <h1>{property.name}</h1>
                        <p>
                            {
                                property.description
                            }
                        </p>
                    </div>

                    <footer id="property-header-info-footer" className="d-flex flex-row gap-1 justify-content-end">
                        <button id="property-header-edit-button" onClick={() => setShowUpdateModal(true)}>Muokkaa</button>
                    </footer>
                </div>
            </div>
           
           <AppModal 
                variant="update/property"
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                property={property}
                uploadFunction={(e) => {
                    e.preventDefault();
                    const content = {
                        address: e.target.name.value,
                        description: e.target.description.value,
                        heating_type: e.target.heating_type.value,
                        wc_count: e.target.wc_count.value,
                        room_count: e.target.room_count.value,
                        floor_count: e.target.floor_count.value,
                        area: e.target.area.value,
                        yard_area: e.target.yard_area.value,
                        yard_ownership: e.target.yard_ownership.value,
                        build_year: e.target.build_year.value,
                    }

                    UpdateProperty(property.id, content, () => {
                        setShowUpdateModal(false);
                        loadProperty();
                    })
                }}
            />
        </header>
    );
}

export default PropertyHeader;