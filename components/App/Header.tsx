"use client";

import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import Image from 'next/image';
import { VisibilityProvider } from 'kotilogi-app/components/Experimental/VisibilityProvider/VisibilityProvider';
import { Group } from 'kotilogi-app/components/Group';
import { RelativePosition } from 'kotilogi-app/components/Experimental/RelativePosition/RelativePosition';
import { useRouter } from 'next/navigation';
import Spinner from '../Spinner/Spinner';
import { serviceName } from 'kotilogi-app/constants';
import toast from 'react-hot-toast';
import { Padding } from '../Util/Padding';
import { MediumDevices, SmallDevices } from '../Util/Media';
import { useState } from 'react';

export function Logo(){
    return (
        <div className="z-40" id="app-logo" title="Etusivulle">
            <Link href="/" id="app-logo-link" className="w-[50px] aspect-auto object-contain">
                <Image width={100} height={50} src={'/logo_new_orange.png'} alt={`${serviceName} logo`}/>
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
                            className="w-[300px] absolute top-[60px] right-0 border border-slate-200 z-40 shadow-lg bg-white"
                        >
                            <nav className="flex flex-col gap-2 p-4">
                                <Link href="/">Etusivu</Link>
                                <Link href="/dashboard/properties">Hallintapaneeli</Link>
                                <span className="cursor-pointer hover:underline" onClick={async () => {
                                    await signOut({redirect: false}).then(() => {
                                        toast.success('Olet kirjautunut ulos.');
                                        router.push('/');
                                    })
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

    const getNavContent = () => {
        if(status === 'loading'){
            return <Spinner size="2rem"/>;
        }
        else if(userIsLoggedIn){
            return (
                <div className="flex gap-2 text-white items-center">
                    <Link href="/">Etusivu</Link>
                    <Link href="/dashboard/properties">Hallintapaneeli</Link>
                    <div className="h-4 border-l border-gray-100 mx-4 sm:hidden md:block"></div>
                    <Link href="/logout" className="font-semibold">Kirjaudu Ulos</Link>
                </div>
            )
        }
        else{
            return (
                <>
                    <div className="text-white sm:text-base flex gap-2 items-center">
                        <Link href="/tos">Käyttöehdot</Link>
                        <div className="h-4 border-l border-gray-100 mx-4 sm:hidden md:block"></div>
                        <Link href="/login">Kirjaudu</Link>
                        <Link href="/register">Rekisteröidy</Link>
                    </div>
                </>
                
            );
        }
    }

    return(
        <header className="w-full py-2 bg-black h-[4em] items-center flex" id="main-header">
            <div className="w-full">
                <Padding>
                    <Group direction="row" justify='between' align="center">
                        <Logo/>
                        {/**Desktop nav */}
                        <nav>
                            {getNavContent()}
                        </nav>
                    </Group>
                </Padding>
            </div>
        </header>
    );
}