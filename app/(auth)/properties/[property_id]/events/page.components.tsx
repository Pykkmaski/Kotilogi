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
import { usePathname, useRouter } from "next/navigation";

function SearchBar(){
    //const {dispatch} = usePageWithDataContext();
    const router = useRouter();
    const route = usePathname();
    const {data, onChange} = useChangeInput({query: ''});

    const updateSearch = (e) => {
        //const newUrl = new URL(route);
        //newUrl.searchParams.set('q', e.target.value);
        
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace(route + `?q=${data.query}`);
        }, 450);

        return () => clearTimeout(timeout);
    }, [data.query]);

    return (
        <input type="search" name="query" placeholder="Etsi..." onInput={onChange}/>
    );
}

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
                <Form id={formId} onSubmit={addEvent}>
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
                </Form>
                
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
    const {state: {selectedItems}} = usePageWithDataContext();

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
            <AddModal show={showAddModal} onHide={() =>setShowAddModal(false)} id="add-event-modal"/>
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
export function Content(props: {data: any[]}){
    const {state, dispatch} = usePageWithData(props.data);

    return (
        <PageWithDataContext.Provider value={{state, dispatch}}>
            <Header/>
            <Gallery data={state.displayedItems} itemComponent={EventListItem}/>
        </PageWithDataContext.Provider>
    );
}