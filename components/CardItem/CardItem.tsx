'use client';

import { createContext } from 'react';
import style from './style.module.scss';
import { CardBody, CardControls, CardHeader, CheckBox } from './CardItem.components';

type CardItemProps<T> = React.PropsWithChildren & {
    item: T,
    selected?: boolean,
}

type CardItemContextProps = {
    item: unknown,
}

export const CardItemContext = createContext<CardItemContextProps | null>(null);

export function CardItem<T extends Kotilogi.ItemType>({children, ...props}: CardItemProps<T>){
    const classes = props.selected ? [style.container, style.selected] : [style.container];
    const className = classes.join(' ');

    return (
        <div className={className}>
            <CardItemContext.Provider value={{item: props.item}}>
                {children}
            </CardItemContext.Provider>
        </div>
    );
}

export function PropertyCardItem(props: CardItemProps<Kotilogi.PropertyType>){
    return (
        <CardItem<Kotilogi.PropertyType> {...props}>
            <CardHeader title={props.item.title} imageSrc={`/api/files/${props.item.mainImageId}?tableName=propertyFiles`}/>
            <CardBody text={props.item.description}/>
            <CardControls>
                <CheckBox/>
                <img src='/icons/bin.png' className={style.icon}/>
            </CardControls>
        </CardItem>
    );
}

export function EventCardItem(props: CardItemProps<Kotilogi.EventType>){
    return (
        <CardItem<Kotilogi.EventType> {...props}>
            <CardHeader title={props.item.title} imageSrc={`/api/files/${props.item.mainImageId}?tableName=eventFiles`}/>
            <CardBody text={props.item.description}/>
            <CardControls>
                <CheckBox/>
                <img src='/icons/bin.png' className={style.icon}/>
            </CardControls>
        </CardItem>
    );
}