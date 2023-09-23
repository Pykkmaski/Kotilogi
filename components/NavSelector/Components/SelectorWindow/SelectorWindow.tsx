import React from 'react';
import style from './style.module.scss';
import { useNavSelectorContext } from '../../NavSelectorContext';

type Props = {
    children: React.ReactNode,
}

export default function SelectorWindow(props: Props){
    const {open} = useNavSelectorContext();

    return (
        <div className={style.selectorWindowContainer} hidden={!open}>
            {props.children}
        </div>
    );
}