"use client";

import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import MainLogo from 'kotilogi-app/assets/logo_orange.png';
import Image from 'next/image';
import { VisibilityProvider } from 'kotilogi-app/components/Experimental/VisibilityProvider/VisibilityProvider';
import { Group } from 'kotilogi-app/components/Group/Group';
import { RelativePosition } from 'kotilogi-app/components/Experimental/RelativePosition/RelativePosition';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../app/AppContext';
import Spinner from '../Spinner/Spinner';

export function Logo(){
    return (
        <div className="z-40" id="app-logo">
            <Link href="/" id="app-logo-link">
                <Image src={MainLogo} alt="Kotilogi logo"/>
            </Link>
        </div>
    );
}

function UserIcon2({email}){

    const router = useRouter();

    const getUserIconContent = () => email ? [email[0].toUpperCase(), email[1].toUpperCase()] : null;

    return (
        <VisibilityProvider>
            <RelativePosition>
                <Group direction="col" gap={4}>
                    <VisibilityProvider.Trigger>
                        <div className="rounded-full w-[50px] h-[50px] bg-white flex flex-col items-center justify-center cursor-pointer font-semibold">
                            {getUserIconContent()}
                        </div>
                    </VisibilityProvider.Trigger>

                    <VisibilityProvider.Target>
                        <div 
                            className="w-[300px] absolute top-[60px] right-0 border border-slate-200 z-20 shadow-lg"
                        >
                            <nav className="flex flex-col gap-2 p-4">
                                <Link href="/">Etusivu</Link>
                                <Link href="/dashboard/properties">Hallintapaneeli</Link>
                                <span className="cursor-pointer hover:underline" onClick={async () => {
                                    router.replace('/');
                                    signOut().then(() => router.replace('/'));
                                }}>Kirjaudu Ulos</span>
                            </nav>
                        </div>
                    </VisibilityProvider.Target>
                </Group>
            </RelativePosition>
        </VisibilityProvider>
    );
}

export default function Header(){
    const {data, status} = useSession();
    const userIsLoggedIn = status === 'authenticated';

    const userEmail = data?.user?.email;
    //<Image src={Logo} alt="Kotilogi logo"/>

    return(
        <header className="w-full pt-2 pb-2 pl-32 pr-32 bg-black h-[4em] items-center flex" id="main-header">
            <div className="w-full">
                <Group direction="row" justify='between' align="center">
                    <Logo/>
                    {/**Desktop nav */}
                    <nav>
                        {
                            status === 'loading' ? <Spinner size="2rem"/>
                            :
                            userIsLoggedIn ?
                                <UserIcon2 email={userEmail}/>
                            :
                            <div className="[&>*]:text-white [&>*]:font-semibold">
                                <Group direction="row" gap={4}>
                                    <Link href="/">Etusivu</Link>
                                    <Link href="/login">Kirjaudu</Link>
                                    <Link href="/register">Rekisteröidy</Link>
                                </Group>
                            </div>
                        }
                    </nav>
                </Group>
            </div>
            
        </header>
    );
}