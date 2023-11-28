"use client";

import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import Menu from './Menu/Menu';
import style from './component.module.scss';
import MainLogo from 'kotilogi-app/assets/logo_orange.png';
import Image from 'next/image';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import MarginContainer from 'kotilogi-app/components/MarginContainer/MarginContainer';

export function Logo(){
    return (
        <div className={style.logo} id="app-logo">
            <Link href="/" id="app-logo-link">
                <Image src={MainLogo} alt="Kotilogi logo"/>
            </Link>
        </div>
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
                    <Link href="/">Etusivu</Link>
                    <Link href="/auth/properties">Talot</Link>
                    <Link href="/auth/events"></Link>
                    <Link href="" onClick={async () => {
                        await signOut();
                    }}>Kirjaudu Ulos</Link>
                </div>
                :
                <div className={style.links}>
                    <Link href="/">Etusivu</Link>
                    <Link href="/pricing">Hinnasto</Link>
                    <Link href="/login">Kirjaudu</Link>
                    <Link href="/register">Rekisteröidy</Link>
                </div>
            }
            </nav>

            {/**Mobile nav */}
            <Menu userIsLoggedIn={userIsLoggedIn}/>
        </header>
    );
}