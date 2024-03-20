'use client';

import { createContext } from 'react';
import style from './style.module.scss';
import React from 'react';
import { CheckBox, ControlsContainer, DeleteButton, DescriptionContainer, EventTitleContainer, InfoContainer, TitleContainer } from './ListItem.components';
import toast from 'react-hot-toast';
import * as properties from '@/actions/properties';
import * as events from '@/actions/events';
import { DottedButtonMenu } from '../DottedButton';

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

        const loadingToast = toast.loading('Poistetaan taloa...');

        properties.del(props.item)
        .then(() => {
            toast.dismiss(loadingToast);
            toast.success('Talo poistettu!')
        })
        .catch(err => {
            toast.error(err.message);
        });
    }
    
    const propertyStatus = props.item.status;

    return (
        <ListItem<Kotilogi.PropertyType> {...props}>
            <InfoContainer href={`/properties/${props.item.id}/info`}>
                <TitleContainer titleText={props.item.title} icon="fa-home" iconSrc='/icons/house.png'/>
                <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
                <small>{props.item.buildingType}</small>
            </InfoContainer>

            <ControlsContainer>
                <CheckBox checked={props.selected}/>
                <DeleteButton onClick={deleteItem}/>
            </ControlsContainer>
        </ListItem>
    );
}

export function EventListItem(props: ListItemProps<Kotilogi.EventType>){
    const timestamp: string | null = props.item.time;
    console.log(timestamp);
    const date = timestamp !== null ? new Date(timestamp).toLocaleDateString('fi-FI') : 'Ei Päivämäärää.';

    const deleteEvent = () => {
        const response = confirm('Olet poistamassa tapahtumaa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        const loadingToast = toast.loading('Poistetaan tapahtumaa...');

        events.del(props.item)
        .then(() => {
            toast.success('Tapahtuma poistettu!')
        })
        .catch(err => {
            toast.error(err.message);
        })
        .finally(() => {
            toast.dismiss(loadingToast);
        })
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
                <EventTitleContainer titleText={props.item.title} icon="fa-history" iconSrc='/icons/history.png' consolidationTime={props.item.consolidationTime}/>
                <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
                <small>{date}</small>
            </InfoContainer>
            
            {
                !isConsolidated ? 
                <ControlsContainer>
                    <CheckBox checked={props.selected}/>
                    <DeleteButton onClick={deleteEvent} hidden={isConsolidated}/>
                </ControlsContainer>
                :
                null
            }
            
        </ListItem>
    );
}