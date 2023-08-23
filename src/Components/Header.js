"use client";

import Link from 'next/link';

const logo = './img/logo.png';

function LoggedOutLinks(){
    return (
        <div className="group-row">
            <Link href="/login" id="login-link">Kirjaudu</Link>
            <Link href="/register" id="register-link">Rekisteröidy</Link>
        </div>
    );
}

function LoggedInLinks(){
    return (
        <div className="group-row">
            <Link href="/logout">Kirjaudu Ulos</Link>
        </div>
    );
}

export default function Header({token, user}){
    return(
        <header className="d-flex flex-row align-items-center justify-content-between" id="primary-header">
            <div className="flex-row gap-m" id="header-logo-area">
                <Link href="/">
                    <img src={logo}/>
                </Link>
            </div>
            
            <div className="navigation">
                {
                    <nav className="group-row">
                        {
                            !token ?
                            <LoggedOutLinks/>
                            :
                            <div className="group-row">
                                <span id="user-email">{user?.email}</span>
                                <LoggedInLinks/>
                            </div>

                        }
                    </nav>
                }
            </div>
        </header>
    );
}