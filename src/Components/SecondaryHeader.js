function SecondaryHeader(props){

    
    return (
        <header id="event-header" className="d-flex flex-column w-100 gap-1 p-5 bg-gray justify-content-center">
            <div id="event-header-back-link-container" className="justify-content-left w-100">
                <Button onClick={() => location.assign(`/#/property/${data.property_id}/events`)}>Takaisin Taloon</Button>
            </div>

            <div id="event-header-body" className="d-flex flex-row gap-1">
                <div className="event-header-image-container">
                    <img id="event-main-image" src={CreateImageUrl({event_id: event.id, main: true, property_id: event.property_id})}/>
                </div>

                <div id="event-header-info-container" className="p-1 d-flex flex-column">
                    <div id="event-header-info-body" className="d-flex flex-column gap-1 fill">
                        <h1>{event.name}</h1>
                        <p>
                            {
                                event.description
                            }
                        </p>
                    </div>

                    <footer id="event-header-info-footer" className="d-flex flex-row gap-1 justify-content-end">
                        <Button id="event-header-edit-button" onClick={() => setShowUpdateModal(true)}>Muokkaa</Button>
                    </footer>
                </div>
            </div>
           
           <AppModal 
                variant="update/event"
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                event={event}
                uploadFunction={(e) => {
                    e.preventDefault();
                    const content = {
                        name: e.target.name.value,
                        description: e.target.description.value,
                        date: e.target.date.value
                    }

                    UpdateEvent(event.id, content, () => {
                        setShowUpdateModal(false);
                        loadEvent();
                    })
                }}
            />
        </header>
    )
}