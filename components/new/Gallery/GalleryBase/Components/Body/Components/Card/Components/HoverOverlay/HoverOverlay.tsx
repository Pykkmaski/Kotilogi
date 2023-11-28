"use client";

import style from './style.module.scss';

export default function HoverOverlay(props: {visible: boolean} & {children: React.ReactNode}){
    return (
        <div className={style.hoverOverlayContainer} hidden={!props.visible}>
            {props.children}
        </div>
    )
}