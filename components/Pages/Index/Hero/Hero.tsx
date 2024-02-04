import Link from 'next/link';
import { Group } from 'kotilogi-app/components/Group/Group';
import {PrimaryButton} from 'kotilogi-app/components/Button/Button2';

type SessionT = {
    user: {
        email: string,
    }
}

export async function Hero(){
    return (
        <div className="flex flex-col gap-5 relative">
            <span className="text-5xl text-white">Talosi huoltotiedot, yhdessä paikassa.</span>
            <p className="text-lg mb-5 text-white">
                Tallenna talosi remonttitiedot, kulutustiedot, tiedostot ja kuvat kätevästi samaan paikkaan. <br/>
                Unohda hukatut kuitit ja hajanaiset asiakirjat - Kotilogi tekee kodin ylläpitämisestä helpompaa ja tehokkaampaa.
            </p>
            
            <Group direction="row" gap={5} center>
                <Link href="/register" className="text-slate-900 bg-orange-300 font-semibold p-2 rounded-md hover:bg-orange-200">Rekisteröidy</Link>
                <Link href="" className="text-white hover:underline cursor-pointer font-semibold">Lue Lisää</Link>
            </Group>
        </div>
    );
    
}