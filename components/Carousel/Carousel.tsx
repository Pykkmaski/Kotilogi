"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';

type CarouselProps<T extends ReactNode> = {
    items: T[],
    autoScroll?: boolean,
}

function TimerBar(props){
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 5);

        return () => clearInterval(interval);
    });

    return (
        <div className={style.timerBar} data-width={((currentTime / props.nextScroll.current) * 100).toString()}/>
    )
}

export default function Carousel<T extends ReactNode>(props: CarouselProps<T>){
    const [currentPosition, setCurrentPosition] = useState<number>(0);

    const buttons = props.items.map((item: T, index: number) => {
        const className = index === currentPosition ? `${style.point} ${style.selected}` : style.point;
        return <div className={className} onClick={() => setCurrentPosition(index)} key={`carousel-point-${index}`}/>
    });

    const scrollInterval = 3000;

    useEffect(() => {
        if(!props.autoScroll) return;

        const interval = setInterval(() => {
            const newPosition = (currentPosition + 1) % props.items.length;
            setCurrentPosition(newPosition);
        }, scrollInterval);

        return () => clearInterval(interval);
    });

    return (
        <div className={style.container}>
            <div className={style.buttons}>
                {buttons}
            </div>
            {props.items[currentPosition]}
        </div>
    )
}