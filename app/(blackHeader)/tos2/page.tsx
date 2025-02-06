import Link from 'next/link';

const BigHeading = ({ children }) => {
  return <h1 className='text-lg text-slate-500 mb-4 font-semibold'>{children}</h1>;
};

export default function TOS() {
  return (
    <main className='text-slate-600 [&_p]:mb-[3rem] mt-8 2xl:px-36 xs:px-2 sm:px-4 md:px-8'>
      <h1 className='text-2xl mt-8 mb-8'>Kotilogin Käyttöehdot</h1>

      <p>
        <strong>Voimassaolopäiväys: 01.01.2024</strong>
      </p>

      <p>
        Tervetuloa Kotidokiin, verkkosovellukseen, joka mahdollistaa käyttäjille kiinteistöjensä
        tietojen tallentamisen. Lue nämä <em>Käyttöehdot</em> ("Ehdot") huolellisesti ennen
        palveluidemme käyttämistä. Käyttämällä Kotidok:ia hyväksyt nämä Ehdot.
      </p>

      <BigHeading>1. Ehtojen Hyväksyminen</BigHeading>
      <p>
        Käyttämällä Kotilogia myönnät, että olet lukenut, ymmärtänyt ja hyväksyt nämä Ehdot. Jos et
        hyväksy näitä Ehtoja, älä käytä palveluamme.
      </p>

      <BigHeading>2. Käyttäjän Vastuut</BigHeading>
      <p>
        <strong>2.1.</strong> Olet vastuussa tallentamiesi tietojen tarkkuudesta ja täydellisyydestä
        Kotidokiin, mukaan lukien kiinteistötiedot, kuvat, tiedostot ja kunnostustapahtumat.
      </p>
      <p>
        <strong>2.2.</strong> Olet yksin vastuussa kirjautumistietojesi turvallisuuden ja
        luottamuksellisuuden ylläpitämisestä ja olet vastuussa kaikista tilisi alla tapahtuvista
        toiminnoista.
      </p>

      <BigHeading>3. Tietojen Menetys</BigHeading>
      <p>
        <strong>3.1.</strong> Kotidok ei ole vastuussa tietojesi menetyksestä tai
        korruptoitumisesta. On sinun vastuullasi säännöllisesti varmuuskopioida tärkeät tiedot,
        jotka on tallennettu alustallemme.
      </p>

      <BigHeading>4. Käyttäjäsisältö</BigHeading>
      <p>
        <strong>4.1.</strong> Säilytät omistusoikeutesi kaikkeen sisältöön, jonka lataat tai
        tallennat Kotilogiin. Lataamalla sisältöä myönnät meille ei-yksinoikeudellisen,
        maailmanlaajuisen, korvauksettoman lisenssin käyttää, kopioida, toisintaa, käsitellä,
        sovittaa, julkaista, lähettää, näyttää ja jakaa sisältöäsi palvelumme tarjoamista varten.
      </p>
      <p>
        <strong>4.2.</strong> Emme tue tai hallitse sisältöä, jonka lataat tai muut käyttäjät
        lataavat, eikä meillä ole mitään vastuuta siitä.
      </p>

      <BigHeading>5. Vastuunrajoitus</BigHeading>
      <p>
        <strong>5.1.</strong> Kotidok ja sen tytäryhtiöt, virkailijat, työntekijät ja edustajat
        eivät ole vastuussa epäsuorista, satunnaisista, erityisistä, seuraamuksellisista tai
        rangaistuksellisista vahingoista tai mistään voittojen tai tulojen menetyksistä, jotka
        aiheutuvat suoraan tai välillisesti, tai mistään tietojen, käytön, hyvän tahdon tai muiden
        aineettomien menetysten menetyksistä, jotka aiheutuvat (a) palvelumme käytöstä tai
        kyvyttömyydestä käyttää palvelua, (b) luvattomasta pääsystä tai käytöstä palvelimillemme
        ja/tai henkilökohtaisista tiedoista, jotka on tallennettu niihin, (c) lähetyksen
        keskeytyksestä tai lakkauttamisesta palvelun tai sen kautta tapahtuvan lähetyksen
        keskeytyksestä tai lakkauttamisesta, (d) virheistä tai puutteista millään sisällöllä tai
        mistään vahingosta tai menetyksestä, joka aiheutuu mistä tahansa sisällöstä, joka on
        julkaistu, lähetetty sähköpostitse, lähetetty, tai muuten tehty saataville palvelun kautta.
      </p>

      <BigHeading>6. Palvelun Lopettaminen</BigHeading>
      <p>
        <strong>6.1.</strong> Pidätämme oikeuden lopettaa tai keskeyttää tilisi ja pääsyn Kotidokiin
        yksinomaisella harkintamme perusteella ilman ennakkoilmoitusta tai vastuuta mistään syystä.
      </p>

      <BigHeading>7. Ehtojen Muutokset</BigHeading>
      <p>
        <strong>7.1.</strong> Kotidok voi muuttaa näitä Ehtoja milloin tahansa. Ilmoitamme
        muutoksista julkaisemalla uudet Ehdot tällä sivulla. On sinun vastuullasi tarkistaa nämä
        Ehdot säännöllisesti.
      </p>

      <BigHeading>8. Sovellettava Laki</BigHeading>
      <p>
        <strong>8.1.</strong> Näitä Ehtoja säännellään ja tulkitaan Suomen lainsäädännön mukaisesti.
      </p>

      <p>
        <strong>Yhteystiedot:</strong> Jos sinulla on kysymyksiä tai huolenaiheita näistä Ehdoista,{' '}
        <Link
          href='/#contact-section'
          className='text-primary'>
          ota meihin yhteyttä.
        </Link>
        .
      </p>

      <p>
        Käyttämällä Kotidokia hyväksyt nämä käyttöehdot ja tietosuojakäytäntömme. Kiitos, että
        käytät Kotidokia!
      </p>
    </main>
  );
}
