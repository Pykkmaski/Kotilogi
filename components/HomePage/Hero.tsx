import Link from 'next/link';
import { Group } from 'kotilogi-app/components/Group';
import {PrimaryButton} from 'kotilogi-app/components/Button/PrimaryButton';
import { serviceName } from 'kotilogi-app/constants';
import Button from '../Button/Button';

type SessionT = {
    user: {
        email: string,
    }
}

export async function Hero(){
    return (
        <section className="flex flex-col gap-5 relative">
            <span className="md:text-8xl xs:text-5xl text-white xs:text-center md:text-left">Talosi huoltokirja</span>
            <p className="text-lg mb-5 text-white xs:text-center md:text-left">
                Tallenna talosi remonttitiedot, kulutustiedot, tiedostot ja kuvat kätevästi samaan paikkaan. <br/>
                Unohda hukatut kuitit ja hajanaiset asiakirjat - {serviceName} tekee kodin ylläpitämisestä helpompaa ja tehokkaampaa.
            </p>
            
            <div className="flex flex-1 xs:justify-center lg:justify-start items-center gap-4">
                <Link href="/register">
                    <Button variant="primary">
                        <span className="mx-8 text-xl">Kokeile Ilmaiseksi</span>
                    </Button>
               </Link>
            </div>
        </section>
    );
    
}