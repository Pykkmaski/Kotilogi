import { serviceName } from 'kotilogi-app/constants';

export function HeroTitleText() {
  return <>Talosi Huoltokirja</>;
}
export function IntroductionText() {
  return (
    <>
      Kuvitellaanpa hetkeksi, että olet tehnyt kotiisi erilaisia remontteja ja ylläpitotoimenpiteitä
      vuosien varrella. Olet hankkinut tarpeelliset kuitit ja asiakirjat näiden töiden
      suorittamisesta, mutta ajan myötä olet hukannut osan niistä tai ne ovat hujan hajan
      sähköpostilaatikossasi.
      <br />
      <br />
      Kun tarvitset tietoja näistä remonteista, kuten esimerkiksi kotitalousvähennyksen hakemista
      varten, joudut kaivelemaan läpi eri paperipinoja tai selata satoja sähköpostiviestejä
      löytääksesi tarvittavat asiakirjat. Tämä voi olla aikaa vievää ja turhauttavaa.
      <br />
      <br />
      Juuri tällaisessa tilanteessa syntyi ajatus {serviceName}-palvelusta. {serviceName} on
      digitaalinen ratkaisu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki kotisi remontit,
      ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen paikkaan - digitaaliseen
      huoltokirjaan.
      <br />
      <br />
    </>
  );
}

export function HeroText() {
  return (
    <>
      Tallenna talosi korjaushistoria, kulutustiedot, tiedostot ja kuvat kätevästi samaan paikkaan.{' '}
    </>
  );
}
