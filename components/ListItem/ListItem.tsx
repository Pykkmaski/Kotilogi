'use client';

import { createContext } from 'react';
import style from './style.module.scss';
import React from 'react';

export type ListItemProps<T extends Kotilogi.ItemType> = React.PropsWithChildren & {
    item: T,
    selected?: boolean,
}

type ListItemContextProps = {
    item: unknown,
    selected?: boolean,
}

export const ListItemContext = createContext<ListItemContextProps | null>(null);

export function ListItemProvider<T extends Kotilogi.ItemType>({children, ...props}: ListItemProps<T>){
    return (
        <ListItemContext.Provider value={{
            item: props.item,
            selected: props.selected,
        }}>
            {children}
        </ListItemContext.Provider>
    );
}

export function ListItem<T extends Kotilogi.ItemType>({children, ...props}: ListItemProps<T>){
    const classes = props.selected ? [style.container, style.selected] : [style.container];
    const className = classes.join(' ');

    return (
        <ListItemProvider item={props.item} selected={props.selected}>
            <div className={className}>
                {children}
            </div>
        </ListItemProvider>
    );
}