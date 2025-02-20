import { serviceName } from 'kotilogi-app/constants';

const BigHeading = ({ children }) => {
  return <h1 className='text-lg text-slate-500 mb-4 font-semibold'>{children}</h1>;
};

const SmallHeading = ({ children }) => {
  return <h2 className='font-semibold mb-2 text-slate-500'>{children}</h2>;
};

export default function TOS() {
  return (
    <main className='text-slate-600 [&_p]:mb-[3rem] mt-8 2xl:px-36 xs:px-2 sm:px-4 md:px-8'>
      <h1 className='text-2xl mt-8 mb-8'>Käyttöehdot</h1>
      <BigHeading>Yleistä</BigHeading>
      <p>
        Näitä yleisiä käyttöehtoja sovelletaan {serviceName} Oy:n {serviceName} palvelun
        rekisteröitymislomakkeessa määritellyn asiakkaan väliseen sitovaan sopimukseen. Palvelun
        käytön edellytyksenä on sopimusehtojen hyväksyminen ja noudattaminen. Käyttämällä palvelua
        hyväksyt nämä Sopimusehdot. Kulloinkin voimassa olevat sopimusehdot ja Palveluntarjoajan
        tietoturva seloste ovat luettavissa Palveluntarjoajan kotisivuilla ja/tai muutoin Palvelun
        yhteydessä. Palvelu on palveluntarjoajan tietoverkon välityksellä tarjoama
        tietokoneohjelmistoon perustuva palvelu, jolla asiakas voi tallentaa omistamansa
        talon/kiinteistön tietoja kuten korjaushistorian, kulutustiedot, kuvat sekä tiedostot.
        Palveluntarjoaja voi tarjota palvelussa tai sen yhteydessä lisäpalveluita, joista peritään
        erillinen maksu. Sopimus syntyy, kun asiakas rekisteröityy palveluun {serviceName}
        .fi-sivuston kautta ja hyväksyy sopimusehdot. Rekisteröityessään Palveluun ja luodessaan
        sinne käyttäjätilin asiakas saa oikeuden käyttää palvelua sisäisessä toiminnassaan
        sopimusehtojen sekä muiden palvelun käyttöä koskevien ohjeiden mukaisesti.
      </p>

      <BigHeading>1. Sopimuksen muuttaminen</BigHeading>
      <p>
        Palveluntarjoajalla on oikeus muuttaa sopimusehtoja ilmoittamalla siitä asiakkaalle
        kirjallisesti vähintään yhtä kuukautta ennen muutoksen voimaantuloa.
      </p>

      <BigHeading>2. Palvelun toimittaminen</BigHeading>
      <p>
        Palvelu toimitetaan ”sellaisena kuin se on”. Palveluntarjoaja ei anna mitään suoranaisia tai
        välillisiä takuita palvelun toiminnasta tai ominaisuuksista eikä takaa, että palvelu toimii
        käyttökatkoitta ja/tai virheettömästi. Palvelu on kuitenkin lähtökohtaisesti käytettävissä
        24 tuntia vuorokaudessa. Lisäksi Palveluntarjoaja pyrkii mahdollisuuksien mukaan
        tiedottamaan palvelussa tapahtuvista asiakkaan kannalta olennaisista katkoksista tai muista
        häiriöistä etukäteen ja suorittamaan palvelun ylläpitoon liittyvät toimenpiteet muutoinkin
        siten, että ne haittaavat palvelun käyttöä mahdollisimman vähän.
      </p>

      <BigHeading>3. Oikeudet ja velvollisuudet</BigHeading>
      <p>
        Asiakas sitoutuu antamaan rekisteröinnin yhteydessä oikeat ja riittävät rekisteröintitiedot.
        Rekisteröinnin toteuttava henkilö vakuuttaa olevansa oikeutettu edustamaan asiakasta
        palvelun käyttöönotossa. Jos asiakkaan rekisteröinnin yhteydessä antamat tiedot
        osoittautuvat virheellisiksi tai muulla tavoin puutteellisiksi, palveluntarjoajalla on
        oikeus olla toimittamatta palvelua. Asiakas ei saa luovuttaa tilin hallintaa kolmansille
        osapuolille. Jos tili tai sen hallinnan mahdollistavat tiedot joutuvat vääriin käsiin,
        asiakkaan on välittömästi ilmoitettava asiasta palveluntarjoajalle. Asiakas sitoutuu
        noudattamaan sopimusta, lakia ja hyvää tapaa palvelua käyttäessään. Palveluntarjoajalla on
        oikeus katkaista palvelun toimittaminen ja poistaa käyttäjätili ilman etukäteisilmoitusta
        mikäli sopimusehtoja rikotaan.
      </p>

      <BigHeading>4. Käyttäjätilillä olevien tietojen säilyttäminen</BigHeading>

      <p>
        Palveluntarjoaja lukitsee Tilin, jos tili ja/tai sille kirjautumisen mahdollistavat tiedot
        ovat joutuneet kolmannen haltuun tai Asiakas on käyttänyt Palvelua Suomen lain,
        Sopimusehtojen tai hyvän tavan vastaiseen toimintaan. Sama koskee tilannetta, jossa Tili
        ja/tai sille kirjautumisen mahdollistavat tiedot ovat päätyneet kolmannen haltuun asiakkaan
        huolimattomuudesta johtuen. palveluntarjoaja arvioi palvelun uudelleen avaamisen
        mahdollisuuden tapauskohtaisesti. Palveluntarjoajalla on oikeus poistaa tili ja asiakkaan
        palvelussa syöttämät tiedot, kun asiakkaan tili on ollut lukittuna kolmen kuukauden ajan.
        Palveluntarjoajalla on oikeus poistaa tili ja sillä olevat tiedot välittömästi, jos asiakas
        on käyttänyt palvelua lain, tämän sopimuksen tai hyvän tavan vastaiseen toimintaan.
        Palveluntarjoaja ylläpitää varmuuskopiota asiakkaan palveluun syöttämistä tiedoista kuuden
        kuukauden ajan. Palveluntarjoaja poistaa kaikki asiakkaan palveluun syöttämät tiedot kuuden
        kuukauden sisällä Sopimuksen päättymisestä, ellei toisin ole sovittu.
      </p>

      <BigHeading>5. Palvelussa oleva aineisto ja immateriaalioikeudet</BigHeading>
      <p>
        Kaikki immateriaalioikeudet palveluun, sen sisältöön, ominaisuuksiin ja toiminnallisuuksiin
        sekä niiden myöhempiin muutoksiin kuuluvat yksin palveluntarjoajalle. Asiakas saa sopimuksen
        voimassaoloajaksi rajoitetun ei-yksinomaisen oikeuden käyttää palvelua omassa käytössä
        sopimusehtojen mukaisesti. Palvelun ja sen sisällön tai osien kopiointi, jäljentäminen,
        eteenpäin välittäminen, levittäminen tai käyttäminen muuten kuin näiden sopimusehtojen
        mukaisesti on ehdottomasti kielletty. Kaikki asiakkaan palveluun syöttämä sisältö kuuluu
        asiakkaalle. Asiakas myöntää palveluntarjoajalle oikeuden käsitellä tällaisia tietoja siinä
        määrin kuin se on tarpeen palvelun tarjoamiseksi.
      </p>

      <BigHeading>6. Vastuunrajoitukset</BigHeading>
      <p>
        Asiakas on aina itse vastuussa omista tietosuojatoimenpiteistään sekä niiden
        lainmukaisuudesta, tuloksellisuudesta ja mahdollisista seurauksista. Palvelun käyttäminen ei
        siirrä asiakkaan tietosuojavelvoitteita ja -vastuita. Palveluntarjoaja ei ole miltään osin
        vastuussa palvelun perusteella luotujen tietosuojakäytäntöjen tuloksista, vaikutuksista tai
        seurauksista, eikä sitä kohtaan voida esittää näiltä osin mitään vaatimuksia. Asiakas
        käyttää palvelua oman harkintansa mukaan ja omalla vastuullaan. Palveluntarjoaja ei vastaa
        asiakkaan palveluun syöttämien tietojen tai dokumenttien tuhoutumisen, katoamisen tai
        muuttumisen aiheuttamista vahingoista eikä niiden uudelleen luomisen aiheuttamista
        kustannuksista. Palveluntarjoaja ei vastaa miltään osin toimenpiteistä, joita asiakkaan
        palveluksessa olevat tai Asiakkaan muutoin valtuuttamat henkilöt suorittavat.
      </p>

      <BigHeading>7. Sovellettava laki ja riidanratkaisu</BigHeading>
      <p>
        Tähän sopimukseen sovelletaan Suomen lakia. Erimielisyydet pyritään ensisijaisesti
        ratkaisemaan neuvottelemalla. Vaikka jokin tämän sopimuksen kohta todettaisiin
        pätemättömäksi, laittomaksi tai kanne kelvottomaksi, se ei vaikuta muiden sopimuskohtien
        pätevyyteen, vaan ne säilyvät voimassa.
      </p>

      <p>
        {serviceName} Oy <br />
        Timontie 13, 65300 Vaasa Suomi
        <br />
        puh: <a href='tel:+358451310749'>+358 45 1310 749</a>
        <br />
        Sähköposti: <a href='mailto:kotidok.service@gmail.com'>kotidok.service@gmail.com</a>
      </p>
    </main>
  );
}
