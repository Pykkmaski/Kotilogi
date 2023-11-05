import style from './style.module.scss';
import Card from "./_Components/Card/Card";
import Button from 'kotilogi-app/components/Button/Button';

export default function PricingPage(){
    return (
        <main className={style.page}>
            <div className={style.cardGrid}>
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
                    <h1>Pro</h1>
                    <Card.Price price={49.90} subText="Tai 4.19/kk"></Card.Price>
                    <p>
                        Pro-tilauksella saat kaikki perustilauksen ominaisuudet sekä rajattoman määrän tallennettuja taloja.
                    </p>
                </Card>
            </div>
        </main>
    )
}