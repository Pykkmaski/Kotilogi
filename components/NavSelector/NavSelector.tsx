"use client";

import style from './style.module.scss';
import React, { useState } from 'react';
import SelectorWindow from './Components/SelectorWindow/SelectorWindow';

type Props = {
    id: string,
    children: React.ReactNode,
}

export default function NavSelector(props: Props){
    const [open, setOpen] = useState(false);
    return (
        <div className={style.navSelectorContainer} onClick={() => setOpen(prev => !prev)}>
            <span>Valikko</span>
            <SelectorWindow open={open}>{props.children}</SelectorWindow>
        </div>
    );
}