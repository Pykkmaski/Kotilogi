function NoEvents(props){

    const imgSrc = './img/no-event.png';
    
    return(
        <div className="error-no-events">
            <img src={imgSrc}/>
            <h2>Ei Tapahtumia</h2>
        </div>
    )
}

export default NoEvents;