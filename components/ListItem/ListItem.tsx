'use client';

import { createContext, useState } from 'react';
import style from './style.module.scss';
import React from 'react';
import Link from 'next/link';
import { usePageWithDataContext } from '../PageWithData/PageWithData';
import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { CheckBox, ControlsContainer, DeleteButton, InfoContainer, TitleContainer } from './ListItem.components';
import { deleteData } from 'kotilogi-app/actions/data/deleteData';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import { deletePropertyEvent } from 'kotilogi-app/actions/propertyEvent/deletePropertyEvent';

type ListItemProps<T extends Kotilogi.ItemType> = React.PropsWithChildren & {
    item: T,
    selected?: boolean,
}

type ListItemContextProps = {
    item: unknown,
}

export const ListItemContext = createContext<ListItemContextProps | null>(null);

export function ListItem<T extends Kotilogi.ItemType>({children, ...props}: ListItemProps<T>){
    const classes = props.selected ? [style.container, style.selected] : [style.container];
    const className = classes.join(' ');

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

export function PropertyListItem(props: ListItemProps<Kotilogi.PropertyType>){
    const deleteItem = () => {
        const response = confirm('Olet poistamassa taloa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        deleteProperty(props.item.id)
        .catch(err => {
            toast.error(err.message);
        });
    }
    
    return (
        <ListItem<Kotilogi.PropertyType> {...props}>
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

export function EventListItem(props: ListItemProps<Kotilogi.EventType>){
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
        <ListItem<Kotilogi.EventType> {...props}>
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

export function PropertyFileListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ListItem<Kotilogi.FileType> {...props}>
            <InfoContainer href={`/files/${props.item.id}?tableName=propertyFiles`}>
                <TitleContainer titleText={props.item.fileName} iconSrc='/icons/copy.png'/>
            </InfoContainer>

            <ControlsContainer>
                <CheckBox/>
                <DeleteButton onClick={() => {}}/>
            </ControlsContainer>
        </ListItem>
    );
}

export function EventFileListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ListItem<Kotilogi.FileType> {...props}>
            <InfoContainer href={`/files/${props.item.id}?tableName=eventFiles`}>
                <TitleContainer titleText={props.item.fileName} iconSrc='/icons/copy.png'/>
            </InfoContainer>

            <ControlsContainer>
                <CheckBox/>
                <DeleteButton onClick={() => {}}/>
            </ControlsContainer>
        </ListItem>
    );
}