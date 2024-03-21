"use client";

import Link from 'next/link';
import {useSession} from 'next-auth/react';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider/VisibilityProvider';
import { Group } from 'kotilogi-app/components/Group';
import Spinner from '../Spinner/Spinner';
import { serviceName } from 'kotilogi-app/constants';
import { Padding } from '../Util/Padding';
import { LineButton } from '../MenuButton/LineButton';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { useToggle } from 'kotilogi-app/hooks/useToggle';

export function Logo(){
    return (
        <div className="z-40" id="app-logo" title="Etusivulle">
            <Link href="/" id="app-logo-link" className="w-[50px] aspect-auto object-contain font-semibold">
                <span className="text-orange-300 text-[1.7rem]">{serviceName[0]}</span>
                <span className="text-white text-[1.2rem]">
                    {
                        serviceName.slice(1)
                    }
                </span>
            </Link>
        </div>
    );
}

export default function Header(){
    const {data, status} = useSession();
    const {toggled: menuVisible, toggleState: toggleMenu} = useToggle(false);
    const userIsLoggedIn = status === 'authenticated';

    const userEmail = data?.user?.email;
    //<Image src={Logo} alt="Kotilogi logo"/>

    const getNavContent = () => {
        if(status === 'loading'){
            return <Spinner size="2rem"/>;
        }
        else if(userIsLoggedIn){
            return (
                <>
                    <div className="md:flex gap-4 text-white items-center xs:hidden">
                        <Link href="/" className="xs:hidden">Etusivu</Link>
                        <Link href="/dashboard/properties">Oma Sivu</Link>
                        <div className="h-4 border-l border-gray-100 mx-4 xs:hidden md:block"></div>
                        <Link href="/logout" className="font-semibold">Kirjaudu Ulos</Link>
                    </div>

                    <div className="xm:block md:hidden">
                        <LineButton onClick={(e) => toggleMenu()}/>
                        <MobileMenu open={menuVisible}>
                            <div className="flex flex-col">
                                <h1 className="text-3xl text-slate-500 mb-8">Valikko</h1>
                                <ul className="flex flex-col gap-4 list-none text-slate-500 text-2xl">
                                    <li>
                                        <Link href="/" onClick={(e) => toggleMenu(false)}>Etusivu</Link>
                                    </li>

                                    <li>
                                        <Link href="/register" onClick={(e) => toggleMenu(false)}>Rekisteröidy</Link>
                                    </li>

                                    <li>
                                        <Link href="/login" onClick={(e) => toggleMenu(false)}>Kirjaudu Sisään</Link>
                                    </li>
                                </ul>
                            </div>
                        </MobileMenu>
                    </div>
                </>
                
            )
        }
        else{
            return (
                <>
                    <div className="text-white xs:text-base md:flex gap-2 items-center xs:hidden">
                        <Link href="/tos">Käyttöehdot</Link>
                        <div className="h-4 border-l border-gray-100 mx-4 xs:hidden md:block"></div>
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