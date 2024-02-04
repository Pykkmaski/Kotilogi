"use client";

import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import style from './component.module.scss';
import MainLogo from 'kotilogi-app/assets/logo_orange.png';
import Image from 'next/image';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import { useState } from 'react';
import { VisibilityProvider } from 'kotilogi-app/components/Experimental/VisibilityProvider/VisibilityProvider';
import { Group } from 'kotilogi-app/components/Group/Group';
import { RelativePosition } from 'kotilogi-app/components/Experimental/RelativePosition/RelativePosition';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../AppContext';
import { Padding } from 'kotilogi-app/components/Util/Padding';

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
                            className={style.userMenu}
                        >
                            <nav>
                                <Link href="/">Etusivu</Link>
                                <Link href="/dashboard/properties">Hallintapaneeli</Link>
                                <span className={style.logoutLink} onClick={async () => {
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
    const {session} = useAppContext();
    const userIsLoggedIn = session !== null;

    const userEmail = session ? session.user.email : 'testUser@email.com';

    //<Image src={Logo} alt="Kotilogi logo"/>

    return(
        <header className="w-full pt-2 pb-2 pl-32 pr-32 bg-black h-[4em] items-center flex" id="main-header">
            <div className="w-full">
                <Group direction="row" justify='between' align="center">
                    <Logo/>
                    {/**Desktop nav */}
                    <nav className={style.navDesktop}>
                        {
                            userIsLoggedIn ?
                            <div className={style.links}>
                                <UserIcon2 email={userEmail}/>
                            </div>
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