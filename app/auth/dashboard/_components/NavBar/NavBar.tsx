'use client';

import { Logo } from 'kotilogi-app/app/_Header/Header';
import style from './style.module.scss';

export default function NavBar({children, title,}){
    return (
        <nav className={style.navBar}>
            <Logo/>
            <h2>{title}</h2>
            {children}
        </nav>
    );
}