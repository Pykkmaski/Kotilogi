'use client';

import { usePathname } from 'next/navigation';
import style from './layout.module.scss';
import { Heading } from 'kotilogi-app/components/Heading/Heading';

export function Header({children}: React.PropsWithChildren){
    return (
        <div className={style.layoutHeader}>
            {children}
        </div>
    );
}
