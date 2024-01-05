'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import style from './style.module.scss';

type NavBarProps = React.PropsWithChildren;

export function NavBar({children}: NavBarProps){
    return (
        <nav className={style.navbar}>
            {children}
        </nav>
    )
}