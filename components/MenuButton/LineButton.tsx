'use client';
import { SetStateAction, useEffect, useRef } from 'react';
import style from './style.module.css';
import { useToggle } from 'kotilogi-app/hooks/useToggle';

type LineButtonProps = React.ComponentProps<'div'> & {
    open: boolean,
    toggleState: (state?: boolean) => void,
}

/**A line button that turns into an X when clicked. */
export function LineButton(props: LineButtonProps){
    const containerRef = useRef<HTMLDivElement>(null)

    const toggle = (e) => {
        props.toggleState();
        props.onClick(e);
    }

    useEffect(() => {
        if(props.open){
            containerRef.current?.classList.add(style.active);
        }
        else{
            containerRef.current?.classList.remove(style.active);
        }
    }, [props.open]);

    return (
        <div className={style.container} ref={containerRef} onClick={toggle}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
        </div>
    );
}