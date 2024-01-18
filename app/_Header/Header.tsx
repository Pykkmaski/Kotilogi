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

export function Logo(){
    return (
        <div className={style.logo} id="app-logo">
            <Link href="/" id="app-logo-link">
                <Image src={MainLogo} alt="Kotilogi logo"/>
            </Link>
        </div>
    );
}

function UserIcon(props: {
    email?: string | null, 
}){
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const content = (
        props.email ? [props.email[0].toUpperCase(), props.email[1].toUpperCase()]
        :
        null
    );

    return (
        <>
            <div className={style.userIcon} onClick={() => setShowMenu(prev => !prev)}>
                <div 
                    className={style.userMenu} 
                    hidden={!showMenu} 
                    onMouseLeave={() => setShowMenu(false)}
                >
                    <nav>
                        <Link href="/">Etusivu</Link>
                        <Link href="/dashboard/properties">Hallintapaneeli</Link>
                        <span className={style.logoutLink} onClick={async () => await signOut()}>Kirjaudu Ulos</span>
                    </nav>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </>
    );
}

function UserIcon2({email}){

    const router = useRouter();

    const getContent = () => email ? [email[0].toUpperCase(), email[1].toUpperCase()] : null;

    return (
        <VisibilityProvider>
            <RelativePosition>
                <Group direction="vertical" gap="1rem">
                    <VisibilityProvider.Trigger>
                        <div className={style.userIcon}>
                            {getContent()}
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

export default function Header(props){
    const {data: session, status} = useSession();

    const userIsLoggedIn = status === 'authenticated';
    const userEmail = session?.user ? session?.user.email : 'testUser@app.com';
    //<Image src={Logo} alt="Kotilogi logo"/>

    return(
        <header className={style.header} id="main-header">
            
            <Logo/>
            {/**Desktop nav */}
            <nav className={style.navDesktop}>
            {
                status === 'loading' ? <Spinner size="2rem"/>
                :
                userIsLoggedIn ?
                <div className={style.links}>
                    <UserIcon2 email={userEmail}/>
                </div>
                :
                <div className={style.links}>
                    <Link href="/">Etusivu</Link>
                    <Link href="/login">Kirjaudu</Link>
                    <Link href="/register">Rekisteröidy</Link>
                </div>
            }
            </nav>
        </header>
    );
}