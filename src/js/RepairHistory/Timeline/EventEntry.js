function EventEntry({item}){
    return (
        <div className={`event-entry`}>
            <header>
                <h2>
                    {item.name}
                </h2>

                <div className="event-body-controls">
                    <button>POISTA</button>
                    <button>MUOKKAA</button>
                </div>
            </header>

            <div className={"event-body"} >
                <div className="event-body-data">
                    <span>{item.description}</span>
                    <span><strong>{item.created_at}</strong></span>
                </div>
                
            </div>
        </div>
    );
}

export default EventEntry;