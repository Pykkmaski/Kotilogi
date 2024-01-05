'use client';

import { PageWithDataContext, usePageWithDataContext } from "kotilogi-app/components/PageWithData/PageWithData";
import {Header as HeaderComponent} from '@/components/Header/Header';
import { Group } from "kotilogi-app/components/Group/Group";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import { useEffect, useState } from "react";
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


function AddModal(props: ModalProps){
    const {property} = usePropertyContext();
    const {data, onChange} = useChangeInput({refId: property.id});

    const addEvent = (e) => {
        e.preventDefault();
        addPropertyEvent(data)
        .catch(err => toast.error(err.message))
        .finally(() => props.onHide());
    }

    const formId = 'add-event-form';
    
    return (
        <Modal {...props}>
            <Modal.Header>Lisää Tapahtuma</Modal.Header>
            <Modal.Body>
                <form id={formId} onSubmit={addEvent}>
                    <Form.Group>
                        <label>Otsikko</label>
                        <input name="title" onChange={onChange} required={true} placeholder="Kirjoita tapahtumalle otsikko..."/>
                    </Form.Group>

                    <Form.Group>
                        <label>Kuvaus</label>
                        <textarea name="description" onChange={onChange} placeholder="Kirjoita tapahtumalle kuvaus..."/>
                    </Form.Group>

                    <Form.Group>
                        <label>Päivämäärä</label>
                        <input name="time" type="date" onChange={onChange}/>
                    </Form.Group>
                </form>
                
            </Modal.Body>
            <Modal.Footer>
                <SecondaryButton desktopText="Peruuta" onClick={props.onHide}/>
                <PrimaryButton desktopText="Lähetä" type="submit" form={formId}/>
            </Modal.Footer>
        </Modal>
    );
}

/**Responsible for rendering the controls and modals related to deleting and adding events.*/
function HeaderControls(){
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {state: {selectedItems}} = usePageWithDataContext() as {state: {selectedItems: Kotilogi.EventType[]}};

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
                <SecondaryButton desktopText="Poista" mobileIconSrc="/icons/bin.png" disabled={!selectedItems.length} onClick={deleteSelectedEvents}/>
                <PrimaryButton desktopText="Lisää Uusi" mobileIconSrc="/icons/plus.png" onClick={() => setShowAddModal(true)}/>
            </Group>
        </>
        
    );
}

export function Header(){
    return (
        <HeaderComponent>
            <h3>Tapahtumat</h3>
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