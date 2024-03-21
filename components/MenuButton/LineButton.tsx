'use client';
import { useEffect, useRef } from 'react';
import style from './style.module.css';
import { useToggle } from 'kotilogi-app/hooks/useToggle';

/**A line button that turns into an X when clicked. */
export function LineButton(props: React.ComponentProps<'div'>){

    const {toggled, toggleState} = useToggle(false);
    const containerRef = useRef<HTMLDivElement>(null)

    const toggle = (e) => {
        toggleState();
        props.onClick(e);
    }

    useEffect(() => {
        if(toggled){
            containerRef.current?.classList.add(style.active);
        }
        else{
            containerRef.current?.classList.remove(style.active);
        }
    }, [toggled]);

    return (
        <div className={style.container} ref={containerRef} onClick={toggle}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
        </div>
    );
}