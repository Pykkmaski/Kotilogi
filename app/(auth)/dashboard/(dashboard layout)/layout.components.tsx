'use client';

import style from './layout.module.scss';

export function Header({children}: React.PropsWithChildren){
    return (
        <div className={style.header}>
            <h3>Hallintapaneeli</h3>
            {children}
        </div>
    );
}