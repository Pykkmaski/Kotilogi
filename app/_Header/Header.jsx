"use client";

import Link from 'next/link';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Menu from './Menu/Menu';
import style from './component.module.scss';
import logo from 'kotilogi-app/public/img/logo.png';
import Image from 'next/image';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';

export default function Header(props){
    const {data: session, status} = useSession();

    const userIsLoggedIn = status === 'authenticated';
    const userEmail = session?.user ? session?.user.email : 'testUser@app.com';

    return(
        <header className={style.header}>
            <div className="flex-row gap-m" id="header-logo-area">
                <Link href="/" id="app-logo-link">
                    <Image src={logo} alt="Kotilogi logo"/>
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
                        <Link href="/properties">Talot</Link>
                        <button id={style.logoutButton} className="primary" type="button" onClick={signOut}>Kirjaudu Ulos</button>
                    </div>
                    :
                    <div className={style.links}>
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