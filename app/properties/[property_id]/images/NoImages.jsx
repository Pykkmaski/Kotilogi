export default function NoImages(props){

    const imgSrc = './img/no-pictures.png';

    return (
        <div className="error-no-images">
            <img src={imgSrc}/>
            <h2>Ei Kuvia</h2>
            <p>
                Kuvat ovat oiva tapa ilmaista talosi ilmettä.<br/>
                Lisää uusi kuva painamalla yläreunassa olevaa "Lisää Uusi" -nappia.
            </p>
        </div>
    )
}
