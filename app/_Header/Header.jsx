import Link from 'next/link';
import {SignIn, SignOut, useSession, getProviders} from 'next-auth/react';
import Menu from './Menu/Menu';
import style from './component.module.scss';
import logo from 'kotilogi-app/public/img/logo.png';
import Image from 'next/image';

export default function Header(props){
    const user = undefined;
    const userIsLoggedIn = true;
    const userEmail = user ? user.email : 'testUser@app.com';

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
                    userIsLoggedIn ?
                    <div className={style.links}>
                        <span id={style.userEmail}>{userEmail}</span>
                        <Link href="/properties">Talot</Link>
                        <button id={style.logoutButton} className="primary" type="button" onClick={SignOut}>Kirjaudu Ulos</button>
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