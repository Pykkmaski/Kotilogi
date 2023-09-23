"use client";

import style from './style.module.scss';
import React, { useState } from 'react';
import SelectorWindow from './Components/SelectorWindow/SelectorWindow';
import Separator from './Components/Separator/Separator';
import SelectorLink from './Components/SelectorWindow/Components/SelectorLink/SelectorLink';
import { usePathname } from 'next/navigation';
import NavSelectorProvider from './NavSelectorContext';

type Props = {
    id: string,
    children: React.ReactNode,
}

export default function NavSelector(props: Props){
    const [open, setOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState<string  | null>(null);

    const contextValue = {
        setSelectedPage,
        open,
    }

    console.log(selectedPage);

    return (
        <div className={style.navSelectorContainer} onClick={() => setOpen(prev => !prev)}>
            <NavSelectorProvider value={contextValue}>
                <span>Valikko</span>
                <Separator/>
                <SelectorWindow>{props.children}</SelectorWindow>
            </NavSelectorProvider>
            
        </div>
    );
}