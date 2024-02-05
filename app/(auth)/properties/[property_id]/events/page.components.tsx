'use client';

import { deletePropertyEvent } from "kotilogi-app/actions/propertyEvent/deletePropertyEvent";
import { AddEventModal } from "kotilogi-app/components/Modals/AddModal";
import {Gallery} from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { EventListItem } from "kotilogi-app/components/ListItem/ListItem";
import {Error} from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error";
import { SearchBar } from "kotilogi-app/components/SearchBar";
import { LayoutGroup } from "kotilogi-app/components/Experimental/LayoutGroup/LayoutGroup";

/**The main content rendering component of the page. */
export function Content({events, propertyId}){
    return (
        <LayoutGroup direction="horizontal" weights={[1, 0.1]} gap="0.5rem">
            <Gallery<Kotilogi.EventType> data={events}>
                <Gallery.Header 
                    title="Tapahtumat" 
                    AddModal={(props: ModalProps) => <AddEventModal {...props} refId={propertyId}/>}
                    DeleteModal={(props: ModalProps) => <Gallery.DeleteModal {...props} deleteMethod={deletePropertyEvent}/>}>
                        <SearchBar/>
                    </Gallery.Header>

                <Gallery.Body 
                    displayStyle="vertical" 
                    itemComponent={EventListItem} 
                    errorElement={
                    <Error title="Ei Tapahtumia" message="Et ole vielä lisännyt tapahtumia. Aloita painamalla Lisää-Uusi painiketta." icon="/icons/history.png"/>
                }/>
            </Gallery>
        </LayoutGroup>
        
    );
}