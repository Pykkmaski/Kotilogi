import style from './style.module.scss';

export default function Pricing(){
    return (
        <section className={style.pricingContainer}>
            <div className={style.gradient}/>
            <div className={style.bgImage}/>

            <div className={style.containerBody}>
                <div className={style.cardsContainer}>
                    <div className={style.card}>
                        <div className={style.cardHeader}>
                            <h1>Perus</h1>
                            <h2>19.90/vuosi</h2>
                            <small>Tai 1.90/kuukausi</small>
                        </div>

                        <div className={style.cardBody}>
                            <ul>
                                <li>Tapahtumat</li>
                                <li>Kuvat</li>
                                <li>Tiedostot</li>
                                <li>Korkeintaan kaksi taloa per käyttäjä</li>
                                <li>Ylimääräiset talot 10€ kappale</li>
                            </ul>
                        </div>
                    </div>

                    <div className={style.card}>
                        <div className={style.cardHeader}>
                            <h1>Pro</h1>
                            <h2>49.90€/vuosi</h2>
                            <small>Tai 4.49/kuukausi</small>
                        </div>

                        <div className={style.cardBody}>    
                            <p>
                                Kaikki perusjäsenyyden ominaisuudet mutta ääretön määrä taloja.
                            </p>
                        </div>
                    </div>
                </div>
               
                <div className={style.textContainer}>
                    <h1>Hinnasto</h1>
                    <p>
                        Meillä Kotilogissa ymmärrämme, kuinka tärkeää on pitää kotisi asiat hallinnassa. Siksi tarjoamme kaksi jäsenyystasoa, jotta voit valita juuri sinulle sopivan vaihtoehdon.
                    </p>
                    
                    <h2>
                        Perus
                    </h2>
                    
                    <p>
                        Perusjäsenenä saat mahdollisuuden lisätä jopa kahden talon tiedot Kotilogiin. Mikäli tarvitset enemmän paikkoja, voit hankkia ylimääräisiä paikkoja hintaan 10 euroa per talo. Perusjäsenyys on vaivaton ja edullinen ratkaisu, joka antaa sinulle perustason ominaisuudet kotisi hallintaan.
                        Perusjäsenyyden vuosihinta: 19.90 euroa.
                    </p>

                    <h2>Pro</h2>
                    <p>

                        Pro-jäsenyys tarjoaa sinulle täyden valikoiman etuja ja ominaisuuksia. Saat kaikki perustason ominaisuudet, mutta ennen kaikkea – sinulle ei ole rajoitusta siinä, montako taloa voit lisätä Kotilogiin. Tämä tarkoittaa, että voit hallita kaikkien kiinteistöjesi tietoja yhdellä käyttäjätilillä.

                        Pro-jäsenyyden vuosihinta: 49.90 euroa.

                        Kotilogi auttaa sinua pitämään kodin tiedot ja asiat järjestyksessä. Olitpa sitten yksittäinen kodinomistaja tai sijoittaja, meillä on sopiva jäsenyystaso tarpeisiisi. Valitse jäsenyystasosi, ja aloita kodin hallinta vaivattomasti ja tehokkaasti jo tänään!
                    </p>
                </div>
            </div>
            
        </section>
    );
}