"use client";

import { useEffect } from 'react';
import style from './style.module.scss';

type Props = {
    visible: boolean,
    children?: React.ReactNode,
}

export default function HoverOverlay(props: Props){

    useEffect(() => {
        console.log('Visible changed ' + props.visible);
    }, [props.visible]);
    
    return (
        <div className={style.container} hidden={!props.visible}>
            {props.children}
        </div>
    )
}