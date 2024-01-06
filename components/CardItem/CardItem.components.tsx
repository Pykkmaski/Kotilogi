'use client';

import Image from "next/image";
import style from './style.module.scss';
import { Group } from "../Group/Group";
import { usePageWithDataContext } from "../PageWithData/PageWithData";
import { useListItemContext } from "../ListItem/ListItem.hooks";
import { useCardItemContext } from "./CardItem.hooks";

export function CheckBox(){
    const {dispatch} = usePageWithDataContext();
    const {item} = useCardItemContext();
    
    return (
        <input type="checkbox" onChange={() => dispatch({
            type: 'select_item',
            value: item,
        })}/>
    )
}

export function CardGradient(){
    return (
        <div className={style.gradient}/>
    );
}

export function CardImage(props: {
    src: string,
}){
    return (
        <Image
            src={props.src}
            alt="Card Image"
            fill={true}
            objectFit='cover'
            className={style.image}/>
    );
}

export function Title(props: {title: string, subTitle?: string}){
    return (
        <div className={style.titleContainer}>
            <span className={style.title}>{props.title}</span>
            <span className={style.subTitle}>{props.subTitle}</span>
        </div>
    );
}

/**Renders an image, a gradient in front of the image, and a title and sub-title in front of them. */
export function CardHeader(props: {
    title: string,
    subTitle?: string,
    imageSrc: string,
}){
    return (
        <div className={style.header}>
            <CardGradient/>
            <CardImage src={props.imageSrc}/>
            
            <Title title={props.title} subTitle={props.subTitle}/>
        </div>
    );
}

export function CardBody(props: {
    text: string,
}){
    return (
        <div className={style.body}>
            <span>{props.text}</span>
        </div>
    );
}

export function CardControls({children}: React.PropsWithChildren){
    return (
        <div className={style.controls}>
            <Group direction="horizontal">
                {children}
            </Group>
        </div>
    );
}