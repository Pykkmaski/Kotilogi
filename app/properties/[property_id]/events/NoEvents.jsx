function NoEvents(props){

    const imgSrc = '/img/no-event.png';

    return(
        <div className="error-no-events">
            <img src={imgSrc}/>
            <h2>Ei Tapahtumia</h2>
            <p>
                Talosi ei vielä sisällä tapahtumia. <br/>
                Aloita painamalla yläreunassa olevaa "Lisää Uusi" -nappia.
            </p>
        </div>
    )
}

export default NoEvents;