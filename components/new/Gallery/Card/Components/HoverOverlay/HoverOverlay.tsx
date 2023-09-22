"use client";

import style from './style.module.scss';

type Props = {
    visible: boolean,
    children?: React.ReactNode,
}

export default function HoverOverlay(props: Props){
    return (
        <div className={style.hoverOverlayContainer} hidden={!props.visible}>
            {props.children}
        </div>
    )
}