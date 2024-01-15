'use client';

import { PageWithDataContext, usePageWithDataContext } from "kotilogi-app/components/PageWithData/PageWithData";
import {Header as HeaderComponent} from '@/components/Header/Header';
import { Group } from "kotilogi-app/components/Group/Group";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { usePropertyContext } from "../_util/PropertyContextProvider";
import { addPropertyEvent } from "kotilogi-app/actions/propertyEvent/addPropertyEvent";
import toast from "react-hot-toast";
import Form from "kotilogi-app/components/Form/Form";
import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { EventListItem } from "kotilogi-app/components/ListItem/ListItem";
import { deletePropertyEvent } from "kotilogi-app/actions/propertyEvent/deletePropertyEvent";
import { usePageWithData } from "kotilogi-app/components/PageWithData/PageWithData.hooks";
import { ViewSelector } from "kotilogi-app/components/ViewSelector/ViewSelector";
import { SearchBar } from "kotilogi-app/components/SearchBar/SearchBar";
import GlobalDeleteModal from "kotilogi-app/components/new/Gallery/Modals/GlobalDeleteModal/GlobalDeleteModal";
import { Input, Textarea } from "kotilogi-app/components/Input/Input";
import { ControlsWithAddAndDelete } from "kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete";
import { AddEventModal, AddPropertyModal } from "kotilogi-app/components/Modals/AddModal";
import { useDashboardContext } from "kotilogi-app/app/(auth)/dashboard/(dashboard layout)/DashboardContextProvider";
import { DeleteModal } from "kotilogi-app/components/Modals/DeleteModal";
import { StateType } from "kotilogi-app/components/Experimental/Gallery/Gallery.reducer";
import { Heading } from "kotilogi-app/components/Heading/Heading";

/**Responsible for rendering the controls and modals related to deleting and adding events.*/
function HeaderControls(){
    const {property} = usePropertyContext();
    const {state: {selectedItems}, dispatch} = usePageWithDataContext() as any;

    const deleteSelectedEvents = () => {
        const eventNames = selectedItems.map(item => item.title);
        const response = confirm(`Olet poistamassa seuraavia tapahtumia: ${eventNames}. Oletko Varma?`);
        if(!response) return;

        for(const item of selectedItems){
            deletePropertyEvent(item.id)
            .catch(err => toast.error(err.message));
        }
    }

    return (
        <>
            <Group direction="horizontal">
                <ViewSelector/>
                <SearchBar/>
                <ControlsWithAddAndDelete
                    id="property-event-controls"
                    AddModalComponent={(props) => <AddEventModal {...props} refId={property.id}/>}
                    DeleteModalComponent={
                        (props) => <DeleteModal {...props} targetsToDelete={selectedItems} deleteMethod={
                            () => {
                                return new Promise<void>(async (resolve, reject) => {
                                    try{
                                        for(const target of selectedItems as Kotilogi.EventType[]){
                                            await deletePropertyEvent(target.id);
                                        }

                                        dispatch({
                                            type: 'reset_selected',
                                            value: null,
                                        });

                                        resolve();
                                    }
                                    catch(err){
                                        reject(err);
                                    }
                                })
                            }
                        } resetSelectedTargets={() => {
                            dispatch({
                                type: 'reset_selected',
                                value: null,
                            });
                        }}/>
                    }   
                    deleteDisabled={!selectedItems.length}/>
            </Group>
        </>
    );
}

export function Header(){
    const {state: {items: events, selectedItems}} = usePageWithDataContext() as {state: {items: Kotilogi.EventType[] | null, selectedItems: Kotilogi.EventType[]}};
 
    return (
        <HeaderComponent>
            <Heading>Tapahtumat</Heading>
            <HeaderControls/>
        </HeaderComponent>
    )
}

/**The main content rendering component of the page. */
export function Content(props: {data: Kotilogi.EventType[]}){
    const {state, dispatch} = usePageWithData<Kotilogi.EventType>(props.data);

    return (
        <PageWithDataContext.Provider value={{state, dispatch}}>
            <Header/>
            <Gallery<Kotilogi.EventType> data={state.displayedItems} itemComponent={EventListItem}/>
        </PageWithDataContext.Provider>
    );
}