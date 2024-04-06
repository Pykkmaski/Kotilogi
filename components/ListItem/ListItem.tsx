'use client';

import { createContext, useRef } from 'react';
import style from './style.module.scss';
import React from 'react';
import { CheckBox, ControlsContainer, DeleteButton, DescriptionContainer, EventTitleContainer, InfoContainer, TitleContainer } from './ListItem.components';
import toast from 'react-hot-toast';
import ActivatePropertyModal from '../Experimental/Modal/ActivatePropertyModal';
import { ModalRefType } from '../Experimental/Modal/Modal';
import { deleteEvent } from 'kotilogi-app/actions/experimental/deleteEvent';

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
    const activateModalRef = useRef<ModalRefType>(null);

    const deactivated = props.item.status === 'deactivated';
    const href = !deactivated ? `/properties/${props.item.id}/info` : '';

    return (
        <>
            <ActivatePropertyModal property={props.item} ref={activateModalRef}/>
            <ListItem<Kotilogi.PropertyType> {...props}>
                <InfoContainer href={href}>
                    <TitleContainer titleText={props.item.title} icon="fa-home" iconSrc='/icons/house.png'>
                    {
                        deactivated ? 
                        <div className="ml-4 flex justify-between w-full">
                            <span className="text-red-700 flex gap-2 items-center">
                                <i className="fa fa-ban"></i>
                                <span>Poistettu käytöstä</span>
                            </span>
                            <span className="text-orange-500 cursor-pointer hover:underline" onClick={() => activateModalRef.current?.toggleOpen(true)}>Ota käyttöön</span>
                        </div>
                        :
                        null
                    }
                    </TitleContainer>
                    <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
                    <small>{props.item.buildingType}</small>
                </InfoContainer>

                <ControlsContainer>
                    {
                        props.item.status !== 'deactivated' ?
                        <CheckBox checked={props.selected}/>
                        :
                        null
                    }
                    
                </ControlsContainer>
            </ListItem>
        </>
       
    );
}

export function EventListItem(props: ListItemProps<Kotilogi.EventType>){
    const timestamp: string | null = props.item.time;
    const date = timestamp !== null ? new Date(timestamp).toLocaleDateString('fi-FI') : 'Ei Päivämäärää.';

    const del = () => {
        const response = confirm('Olet poistamassa tapahtumaa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        const loadingToast = toast.loading('Poistetaan tapahtumaa...');

        deleteEvent(props.item.id)
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
                    <DeleteButton onClick={del} hidden={isConsolidated}/>
                </ControlsContainer>
                :
                null
            }
            
        </ListItem>
    );
}