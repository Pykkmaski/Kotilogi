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
import Button from '../Button/Button';

function Logo2(){
    return (
        <Link href="/">
            <img src="/logo.png" className="aspect-auto md:w-[170px] xs:w-[130px]"/>
        </Link>
    );
}

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

type HeaderProps = {
    variant?: 'black' | 'transparent';
}

export default function Header({variant = 'black'}: HeaderProps){
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
                        <MobileMenu>
                            <nav className="flex flex-col gap-8 text-4xl">
                                <Link href="/dashboard/properties">Oma sivu</Link>
                                <Link href="/logout">Kirjaudu ulos</Link>
                            </nav>
                        </MobileMenu>
                    </div>
                </>
            )
        }
        else{
            const linkClassName = '';

            return (
                <>
                    <nav className="text-white xs:text-base md:flex gap-4 items-center xs:hidden font-semibold">
                        <Link href="/about" className={linkClassName}>Tietoa Meistä</Link>
                        <Link href="/tos" className={linkClassName}>Käyttöehdot</Link>
                        <div className="h-4 border-l border-gray-100 mx-4 xs:hidden md:block"></div>
                        <Link href="/register" className={linkClassName}>Rekisteröidy</Link>

                        <Link href="/login" className="ml-8">
                            <Button variant="primary">
                                <span className="mx-8 text-black">Kirjaudu Sisään</span>
                            </Button>
                        </Link>
                        
                    </nav>

                    <div className="xs:block md:hidden">
                        <MobileMenu>
                            <nav className="flex flex-col gap-8 text-4xl z-50">
                                <Link href="/">Etusivulle</Link>
                                <Link href="/about">Tietoa Meistä</Link>
                                <Link href="/register">Rekisteröidy</Link>
                                <Link href="/login">Kirjaudu Sisään</Link>
                            </nav>
                        </MobileMenu>
                    </div>
                </>
            );
        }
    }

    const className = [
        "w-full py-2 h-[4em] items-center flex z-20",
        variant === 'black' ? 'bg-black' : 'bg-gradient-to-l from-[#0005] to-transparent to-60% absolute top-0 left-0',
    ];

    return(
        <header className={className.join(' ')} id="main-header">
            <div className="w-full ">
                <Padding>
                    <Group direction="row" justify='between' align="center">
                        <Logo2/>
                        {getNavContent()}
                    </Group>
                </Padding>
            </div>
        </header>
    );
}