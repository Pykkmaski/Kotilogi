import Link from 'next/link';
import styles from './styles.module.scss';
import LinkButton from 'kotilogi-app/components/LinkButton/LinkButton';

function ProfileText(){
    return (
        <div className={styles.container}>
            <div className={styles.element}>

                <div className={styles.text}>
                    <h1 className="text-4xl text-slate-500">Mikä Kotilogi?</h1>
                    <p>
                        Kuvitellaanpa hetkeksi, että olet tehnyt kotiisi erilaisia remontteja ja ylläpitotoimenpiteitä 
                        vuosien varrella. Olet hankkinut tarpeelliset kuitit ja asiakirjat näiden töiden suorittamisesta, 
                        mutta ajan myötä olet hukannut osan niistä tai ne ovat hujan hajan sähköpostilaatikossasi.
                    </p>

                    <p>
                        Kun tarvitset tietoja näistä remonteista, kuten esimerkiksi kotitalousvähennyksen hakemista varten, 
                        joudut kaivelemaan läpi eri paperipinoja tai selata satoja sähköpostiviestejä löytääksesi tarvittavat asiakirjat. 
                        Tämä voi olla aikaa vievää ja turhauttavaa.
                    </p>

                    <p>
                        Juuri tällaisessa tilanteessa syntyi ajatus Kotilogi-palvelusta. 
                        Kotilogi on digitaalinen ratkaisu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki kotisi remontit, 
                        ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen paikkaan - digitaaliseen huoltokirjaan.
                    </p>

                    <p>
                        Miksi tarvitset Kotilogi-palvelua? Sen avulla voit helposti tallentaa kaikki kotiisi tehdyt muutokset, remontit ja huoltopisteet yhteen paikkaan. Tiedot ovat helposti saatavilla aina kun niitä tarvitset, olipa kyseessä sitten kotitalousvähennyksen hakeminen, myynti tai seuraavan omistajan tietojen jakaminen tulevaisuudessa. 
                    </p>

                    <p>
                        Unohtakaa hukatut kuitit ja hajanaiset asiakirjat - Kotilogi tekee kodin ylläpitämisestä helpompaa ja tehokkaampaa. Joten, pidä huolta kodistasi ja sen historiasta yksinkertaisesti ja kätevästi Kotilogi-palvelun avulla.
                        <br/><br/>
                        <Link href="/register" className="rounded-md font-semibold text-slate-900 bg-orange-300 p-2 shadow-md hover:bg-orange-200">Aloita Kotilogin Käyttö</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileText;