import { serviceName } from "kotilogi-app/constants";
import Button from "../Button/Button";
import Link from "next/link";

export function Profile2(){
    return (
        <section className="xs:px-2 md:px-32 py-32 flex flex-col bg-primary text-secondary">
            <div className="flex flex-row gap-8">
                <div className="flex flex-col flex-1 xs:items-center md:items-start">
                    <h1 className="md:text-7xl xs:text-4xl">Mikä on Kotidok?</h1>
                    <p className="mt-20 text-lg xs:text-center md:text-left">
                        Kuvitellaanpa hetkeksi, että olet tehnyt kotiisi erilaisia remontteja ja ylläpitotoimenpiteitä 
                        vuosien varrella. Olet hankkinut tarpeelliset kuitit ja asiakirjat näiden töiden suorittamisesta, 
                        mutta ajan myötä olet hukannut osan niistä tai ne ovat hujan hajan sähköpostilaatikossasi.<br/><br/>

                        Kun tarvitset tietoja näistä remonteista, kuten esimerkiksi kotitalousvähennyksen hakemista varten, 
                        joudut kaivelemaan läpi eri paperipinoja tai selata satoja sähköpostiviestejä löytääksesi tarvittavat asiakirjat. 
                        Tämä voi olla aikaa vievää ja turhauttavaa.<br/><br/>

                        Juuri tällaisessa tilanteessa syntyi ajatus {serviceName}-palvelusta. {serviceName} on digitaalinen ratkaisu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki kotisi remontit, 
                        ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen paikkaan - digitaaliseen huoltokirjaan.<br/><br/>
                    </p>

                    <Link href="/about" className="mt-8">
                        <Button variant="secondary-filled">
                            <span className="mx-32 my-4 text-lg font-semibold text-hero">Lue Lisää</span>
                        </Button>
                    </Link>
                </div>

                <div className="w-full object-contain flex-1 xs:hidden md:block">
                    <img src="/img/renovate.jpg" className="flex-1 aspect-auto"/>
                </div>
            </div>
            
        </section>
    );
}