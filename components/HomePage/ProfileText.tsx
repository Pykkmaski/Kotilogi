import {Prices, serviceName} from '@/constants';
import Link from 'next/link';
import { PrimaryButton } from '../Button/PrimaryButton';
import { getFullPrice } from 'kotilogi-app/utils/getFullPrice';
import Button from '../Button/Button';

function PricingCard({children}){
    return (
        <div className="rounded-lg min-w-[250px] min-h-[500px] shadow-lg overflow-hidden flex flex-col bg-gradient-to-b from-white to-slate-300">
            {children}
        </div>
    );
}

type TaxNoticeProps = {
    plan: 'regular' | 'pro',
}

function TaxNotice({plan}){
    return <span className="text-sm text-white">Sisältää ALV {Prices.TAX * 100}% (Veroton: {(Prices[plan] / 100).toFixed(2)}€)</span>
}

type PlanCardButtonProps = {
    action?: (e: any) => Promise<void>,
}

function PlanCardButton({action}: PlanCardButtonProps){
    return (
        action ? (
        <div className="mt-auto w-full flex justify-center pb-4">
            <Button variant="primary" onClick={action}>
                <span className="mx-8 font-semibold">Tilaa</span>
            </Button>
        </div>
        )
        :
        null
    )
}

export function RegularPlanCard({buttonAction = undefined}){
    return (
        <PricingCard>
            <div className="bg-gray-500 p-4 flex flex-col">
                <h1 className="text-orange-300 font-semibold text-2xl">Perus</h1>
                <span className="text-white font-semibold">{getFullPrice('regular')}€/kk</span>
                <TaxNotice plan="regular"/>
            </div>

            <div className="p-4 flex-1">
                <span className="font-semibold mb-2">Yhden talon tiedot +</span>
                <ul className="list-disc ml-4 [&>li]:text-gray-600">
                    <li>Tiedostot</li>
                    <li>Kuvat</li>
                    <li>Tapahtumat</li>
                    <li>Kulutustiedot</li>
                </ul>
            </div>

            <PlanCardButton action={buttonAction}/>
        </PricingCard>
    );
}

export function ProPlanCard({buttonAction = undefined}){
    return (
        <PricingCard>
            <div className="bg-gray-500 p-4 flex flex-col">
                <h1 className="text-orange-300 font-semibold text-2xl">Pro</h1>
                <span className="text-white font-semibold">{getFullPrice('pro')}€/kk</span>
                <TaxNotice plan="pro"/>
            </div>

            <div className="p-4 flex-1">
                <span className="font-semibold mb-2">Rajaton määrä taloja +</span>
                <ul className="list-disc ml-4  [&>li]:text-gray-600">
                    <li>Tiedostot</li>
                    <li>Kuvat</li>
                    <li>Tapahtumat</li>
                    <li>Kulutustiedot</li>
                </ul>
            </div>

            <PlanCardButton action={buttonAction}/>
        </PricingCard>
    );
}

function ProfileText(){
    return (
        <div className="flex xs:flex-col lg:flex-row w-full">
            <div className="flex-1">
                <div className="flex flex-col gap-4">
                    <h1 className="md:text-4xl xs:text-xl text-slate-500 xs:text-center lg:text-left">Mikä {serviceName}?</h1>
                    <p className="mt-4 mb-4 md:text-lg xs:text-base">
                        Kuvitellaanpa hetkeksi, että olet tehnyt kotiisi erilaisia remontteja ja ylläpitotoimenpiteitä 
                        vuosien varrella. Olet hankkinut tarpeelliset kuitit ja asiakirjat näiden töiden suorittamisesta, 
                        mutta ajan myötä olet hukannut osan niistä tai ne ovat hujan hajan sähköpostilaatikossasi.<br/><br/>

                        Kun tarvitset tietoja näistä remonteista, kuten esimerkiksi kotitalousvähennyksen hakemista varten, 
                        joudut kaivelemaan läpi eri paperipinoja tai selata satoja sähköpostiviestejä löytääksesi tarvittavat asiakirjat. 
                        Tämä voi olla aikaa vievää ja turhauttavaa.<br/><br/>

                        Juuri tällaisessa tilanteessa syntyi ajatus {serviceName}-palvelusta. {serviceName} on digitaalinen ratkaisu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki kotisi remontit, 
                        ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen paikkaan - digitaaliseen huoltokirjaan.<br/><br/>
                    </p>
                    
                    <div className="flex flex-row w-full xs:justify-center lg:justify-start xs:mb-8">
                        <Link href="/register">
                            <PrimaryButton>
                                <span className="font-semibold">Aloita {serviceName}:n Käyttö</span>
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>    
            </div>

            <div className="flex-1 md:flex flex-row-reverse gap-4 items-center justify-center xs:hidden">
                <ProPlanCard/>
                <RegularPlanCard/>
            </div>
        </div>
    );
}

export default ProfileText;