import style from './style.module.scss';
import Card from "./_Components/Card/Card";

export default function PricingPage(){
    return (
        <main className={style.page}>
            <Card>
                <h1>Perus</h1>
                <Card.Price price={19.90} subText="Tai 1,90€/kk"></Card.Price>
                <p>
                    Perustilauksella tallennat korkeintaan kahdelle (2) kiinteistölle
                    Tiedot, kuvat, tapahtumat ja tiedostot.<br/>
                    Perustilaus sopii suurimmalle osalle käyttäjistä.
                </p>
            </Card>

            <Card>
                <h1>Extra</h1>
                <Card.Price price={29.90} subText="Tai 2,90/kk"></Card.Price>
                <p>
                    Extralla saat kaikki perustilauksen ominaisuudet sekä kaksi (2) kiinteistön tallennuspaikkaa lisää.
                </p>
            </Card>

            <Card>
                <h1>Enterprise</h1>
                <Card.Price price={49.90} subText="Tai 4.19/kk"></Card.Price>
                <p>
                    Extralla saat kaikki perustilauksen ominaisuudet sekä kaksi (2) kiinteistön tallennuspaikkaa lisää.
                </p>
            </Card>
        </main>
    )
}