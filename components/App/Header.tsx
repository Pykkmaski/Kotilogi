"use client";

import Link from 'next/link';
import {useSession} from 'next-auth/react';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider/VisibilityProvider';
import { Group } from 'kotilogi-app/components/Group';
import Spinner from '../Spinner/Spinner';
import { serviceName } from 'kotilogi-app/constants';
import { Padding } from '../Util/Padding';
import { LineButton } from '../MenuButton/LineButton';
import { Button } from './MobileMenu/MobileMenu';

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

function MobileMenu({children}: React.PropsWithChildren){
    return (
        <VisibilityProvider>
            <VisibilityProvider.Trigger>
                <LineButton/>
            </VisibilityProvider.Trigger>

            <VisibilityProvider.Target>
                {children}
            </VisibilityProvider.Target>
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
                <>
                    <div className="md:flex gap-4 text-white items-center xs:hidden">
                        <Link href="/" className="xs:hidden">Etusivu</Link>
                        <Link href="/dashboard/properties">Oma Sivu</Link>
                        <div className="h-4 border-l border-gray-100 mx-4 xs:hidden md:block"></div>
                        <Link href="/logout" className="font-semibold">Kirjaudu Ulos</Link>
                    </div>

                    <div className="sm:block md:hidden">
                        <MobileMenu>
                            <Link href="">Test</Link>
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