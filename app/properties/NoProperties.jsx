function NoProperties(props){

    const imgSrc = './img/house.png';

    return (
        <div className="error-no-content">
            <img src={imgSrc}/>
            <h2>Ei Talotietoja</h2>
            <p>
                Talosi historian tallentaminen on klikkauksen päässä!<br/>
                Aloita painamalla yläreunassa olevaa "Lisää Uusi" -nappia.
            </p>
        </div>
    )
}

export default NoProperties;