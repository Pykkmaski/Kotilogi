import Link from 'next/link';
import { Group } from 'kotilogi-app/components/Group';
import {PrimaryButton} from 'kotilogi-app/components/Button/PrimaryButton';

type SessionT = {
    user: {
        email: string,
    }
}

export async function Hero(){
    return (
        <div className="flex flex-col gap-5 relative">
            <span className="text-5xl text-white sm:text-center md:text-left">Talosi huoltokirja</span>
            <p className="text-lg mb-5 text-white sm:text-center md:text-left">
                Tallenna talosi remonttitiedot, kulutustiedot, tiedostot ja kuvat kätevästi samaan paikkaan. <br/>
                Unohda hukatut kuitit ja hajanaiset asiakirjat - Kotiloki tekee kodin ylläpitämisestä helpompaa ja tehokkaampaa.
            </p>
            
            <div className="flex flex-1 sm:justify-center lg:justify-start items-center gap-4">
                <Link href="/register">
                    <PrimaryButton>
                        <span className="font-semibold">Rekisteröidy</span>
                    </PrimaryButton>
               </Link>
                <Link href="" className="text-white hover:underline cursor-pointer font-semibold">Lue Lisää</Link>
            </div>
               

        </div>
    );
    
}