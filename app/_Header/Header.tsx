"use client";

import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import Menu from './Menu/Menu';
import style from './component.module.scss';
import Logo from 'kotilogi-app/assets/logo_orange.png';
import Image from 'next/image';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';

export default function Header(props){
    const {data: session, status} = useSession();

    const userIsLoggedIn = status === 'authenticated';
    const userEmail = session?.user ? session?.user.email : 'testUser@app.com';
    //<Image src={Logo} alt="Kotilogi logo"/>

    return(
        <header className={style.header} id="main-header">
            <div className={style.logo} id="app-logo">
                <Link href="/" id="app-logo-link">
                    <Image src={Logo} alt="Kotilogi logo"/>
                </Link>
            </div>

            {/**Desktop nav */}
            <nav className={style.navDesktop}>
                {
                    status === 'loading' ? <Spinner size="2rem"/>
                    :
                    userIsLoggedIn ?
                    <div className={style.links}>
                        <span id={style.userEmail}>{userEmail}</span>
                        <Link href="/">Etusivu</Link>
                        <Link href="/auth/properties">Talot</Link>
                        <Link href="/auth/events"></Link>
                        <button id={style.logoutButton} className="primary" type="button" onClick={async () => {
                            await signOut();
                        }}>Kirjaudu Ulos</button>
                    </div>
                    :
                    <div className={style.links}>
                        <Link href="/">Etusivu</Link>
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