import style from './style.module.scss';
import React from 'react';
import NavOption from './Components/Option';

type Props = {
    id: string,
    children: React.ReactNode,
}

export default function NavSelector(props: Props){
    return (
        <select className={style.navSelectorContainer} id={props.id}>
            {props.children}
        </select>
    )
}

NavSelector.Option = NavOption;