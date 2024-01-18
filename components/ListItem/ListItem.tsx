'use client';

import { createContext } from 'react';
import style from './style.module.scss';
import React from 'react';
import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { CheckBox, ControlsContainer, DeleteButton, DescriptionContainer, EventTitleContainer, InfoContainer, TitleContainer } from './ListItem.components';
import toast from 'react-hot-toast';
import { deletePropertyEvent } from 'kotilogi-app/actions/propertyEvent/deletePropertyEvent';

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
                <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
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
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            backgroundColor: 'orange',
            position: 'absolute',
            top: '-5px',
            right: '-5px',
        }} title="Tämä tapahtuma on poistettavissa. Varmista että tapahtuman tiedot ovat oikein ennenkuin tapahtuma vakiinutetaan!" hidden={parseInt(props.item.consolidationTime) <= Date.now()}/>
    );

    const isConsolidated = Date.now() >= parseInt(props.item.consolidationTime);

    return (
        <ListItem<Kotilogi.EventType> {...props}>
            <InfoContainer href={`/events/${props.item.id}/info`}>
                <EventTitleContainer titleText={props.item.title} iconSrc='/icons/history.png' consolidationTime={props.item.consolidationTime}/>
                <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
                <small>{date}</small>
            </InfoContainer>
            
            {
                !isConsolidated ? 
                <ControlsContainer>
                    <CheckBox/>
                    <DeleteButton onClick={deleteEvent} hidden={isConsolidated}/>
                </ControlsContainer>
                :
                null
            }
            
        </ListItem>
    );
}