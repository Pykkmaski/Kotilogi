'use client';

import { createContext } from 'react';
import style from './style.module.scss';
import React from 'react';
import Link from 'next/link';
import { usePageWithDataContext } from '../PageWithData/PageWithData';
import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { CheckBox, ControlsContainer, DeleteButton, InfoContainer, TitleContainer } from './ListItem.components';
import { deleteData } from 'kotilogi-app/actions/data/deleteData';
import toast from 'react-hot-toast';
import { deletePropertyEvent } from 'kotilogi-app/actions/propertyEvent/deletePropertyEvent';

type ListItemProps<T extends {id: string}> = React.PropsWithChildren & {
    item: T,
}

type ListItemContextProps = {
    item: unknown,
}

export const ListItemContext = createContext<ListItemContextProps | null>(null);

export function ListItem<T extends {id: string}>({children, ...props}: ListItemProps<T>){
    const {state, dispatch} = usePageWithDataContext();
    const selected = state.selectedItems.includes(props.item);
    const className = selected ? `${style.container} ${style.selected}` : style.container;

    return (
        <div className={className}>
            <ListItemContext.Provider value={{
                item: props.item,
            }}>
                {children}
            </ListItemContext.Provider>
        </div>
    );
}

type PropertyType = {
    id: string,
    title: string,
    description: string,
    buildingType: string,
}

export function PropertyListItem(props: ListItemProps<PropertyType>){
    const deleteItem = () => {
        const response = confirm('Olet poistamassa taloa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        deleteProperty(props.item.id)
        .catch(err => {
            toast.error(err.message);
        });
    }
    
    return (
        <ListItem<PropertyType> item={props.item}>
            <InfoContainer href={`/properties/${props.item.id}/info`}>
                <TitleContainer titleText={props.item.title} iconSrc='/icons/house.png'/>
                <small>{props.item.buildingType}</small>
            </InfoContainer>

            <ControlsContainer>
                <CheckBox/>
                <DeleteButton onClick={deleteItem}/>
            </ControlsContainer>
        </ListItem>
    );
}

type EventType = {
    time: string | null,
    title: string,
    id: string,
    description: string,
    consolidationTime: string,
}

export function EventListItem(props: ListItemProps<EventType>){
    const date = props.item.time ? new Date(props.item.time).toLocaleDateString('fi-FI') : 'Ei Päivämäärää.';

    const deleteEvent = () => {
        const response = confirm('Olet poistamassa tapahtumaa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        deletePropertyEvent(props.item.id)
        .catch(err => {
            toast.error(err.message);
        });
    }

    const HighlightBadge = () => (
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'orange',
            position: 'absolute',
            top: 0,
            right: 0,
        }} hidden={parseInt(props.item.consolidationTime) <= Date.now()}/>
    );

    return (
        <ListItem<EventType> item={props.item}>
            <HighlightBadge/>
            <InfoContainer href={`/events/${props.item.id}`}>
                <TitleContainer titleText={props.item.title} iconSrc='/icons/history.png'/>
                <small>{date}</small>
            </InfoContainer>

            <ControlsContainer>
                <CheckBox/>
                <DeleteButton onClick={deleteEvent} hidden={Date.now() >= parseInt(props.item.consolidationTime)}/>
            </ControlsContainer>
        </ListItem>
    );
}