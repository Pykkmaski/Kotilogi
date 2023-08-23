export default function NoUsage(props){
    const imgSrc = './img/bolt.png';

    return (
        <div className="error-no-usage">
            <img src={imgSrc}/>
            <h2>Ei Kulutustietoja</h2>
            <p>
                Talosi ei sisällä kulutustietoja. <br/>
                Muutetaan asiaa painamalla yläreunassa olevaa "Lisää Uusi" -nappia.
            </p>
        </div>
    )
}