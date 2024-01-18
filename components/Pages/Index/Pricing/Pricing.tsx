import LinkButton from 'kotilogi-app/components/LinkButton/LinkButton';
import style from './style.module.scss';
import { Group } from 'kotilogi-app/components/Group/Group';

const basicPrice = 39.90;
const proPrice = 59.90;

function PricingCard({children}){
    return (
        <div className={style.card}>
            <Group direction="vertical" gap="0">
                {children}
            </Group>
        </div>
    );
}

type CardProps = {
    buttonEnabled: boolean,
}

export function RegularCard(props: CardProps){
    return (
        <PricingCard>
            <div className={style.cardHeader}>
                <h1>Perus</h1>
                <h2>{basicPrice}€/vuosi</h2>
                <small>Tai 3,49€/kuukausi</small>
            </div>

            <div className={style.cardBody}>
                <ul>
                    <li>Tapahtumat</li>
                    <li>Kuvat</li>
                    <li>Tiedostot</li>
                    <li>Kulutustiedot</li>
                    <li>Korkeintaan yksi talo per käyttäjä</li>
                </ul>

                {
                    props.buttonEnabled ? 
                    <LinkButton
                        href="/register?plan=regular"
                        text="Avaa Perus-tili"
                        className={style.linkButton}
                    />
                    :
                    null
                }
            </div>
        </PricingCard>
    );
}

export function ProCard(props: CardProps){
    return (
        <div className={style.card}>
            <div className={style.cardHeader}>
                <h1>Pro</h1>
                <h2>{proPrice}€/vuosi</h2>
                <small>Tai 5.49€/kuukausi</small>
            </div>

            <div className={style.cardBody}>    
                <p>
                    Kaikki perusjäsenyyden ominaisuudet rajattomalla talojen määrällä.
                </p>

                {
                    props.buttonEnabled ? 
                    <LinkButton
                        href="/register?plan=pro"
                        text="Avaa Pro-tili"
                    />
                    :
                    null
                }
                
            </div>
        </div>
    );
}

export default function Pricing(){
    return (
        <section className={style.pricingContainer}>
            <div className={style.gradient}/>
            <div className={style.bgImage}/>

            <div className={style.containerBody}>
                <Group direction="horizontal" gap="2rem">
                    <Group direction="horizontal" gap="1rem">
                        <ProCard buttonEnabled={true}/>
                        <RegularCard buttonEnabled={true}/>
                    </Group>
               
                    <div className={style.textContainer}>
                        <h1>Hinnasto</h1>
                        <p>
                            Meillä Kotilogissa ymmärrämme, kuinka tärkeää on pitää kotisi asiat hallinnassa. Siksi tarjoamme kaksi jäsenyystasoa, jotta voit valita juuri sinulle sopivan vaihtoehdon.
                        </p>
                        
                        <h2>
                            Perus
                        </h2>
                        
                        <p>
                            Perusjäsenenä saat mahdollisuuden lisätä yhden talon tiedot Kotilogiin. Perusjäsenyys on vaivaton ja edullinen ratkaisu, joka antaa sinulle perustason ominaisuudet kotisi hallintaan.
                            Perusjäsenyyden vuosihinta: 39.90 euroa.
                        </p>

                        <h2>Tulossa: Pro</h2>
                        <p hidden={true}>

                            Pro-jäsenyys tarjoaa sinulle täyden valikoiman etuja ja ominaisuuksia. Saat kaikki perustason ominaisuudet, mutta ennen kaikkea – sinulle ei ole rajoitusta siinä, montako taloa voit lisätä Kotilogiin. Tämä tarkoittaa, että voit hallita kaikkien kiinteistöjesi tietoja yhdellä käyttäjätilillä.

                            Pro-jäsenyyden vuosihinta: 29.90 euroa.

                            Kotilogi auttaa sinua pitämään kodin tiedot ja asiat järjestyksessä. Olitpa sitten yksittäinen kodinomistaja tai sijoittaja, meillä on sopiva jäsenyystaso tarpeisiisi. Valitse jäsenyystasosi, ja aloita kodin hallinta vaivattomasti ja tehokkaasti jo tänään!
                        </p>
                    </div>
                </Group>    
            </div>
            
        </section>
    );
}