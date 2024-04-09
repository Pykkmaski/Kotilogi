'use client';

import {Gallery} from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import {Error} from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error";
import { SearchBar } from "kotilogi-app/components/SearchBar";
import { LayoutGroup } from "kotilogi-app/components/Experimental/LayoutGroup/LayoutGroup";
import { AddButton, DeleteButton } from "@/components/new/Gallery/GalleryBase/Buttons";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { deleteEvent } from "kotilogi-app/actions/experimental/events";
import AddEventModal from "./AddEventModal";
import { EventListItem } from "./EventListItem";
import { VisibilityProvider } from "@/components/Util/VisibilityProvider/VisibilityProvider";
import { SearchForEventsModal } from "./SearchForEventsModal";

/**The main content rendering component of the page. */
export function Content({events, propertyId}){
    return (
        <LayoutGroup direction="horizontal" weights={[1, 0.1]} gap="0.5rem">
            <Gallery<Kotilogi.EventType> data={events}>
                <Gallery.AddModal>
                    <AddEventModal propertyId={propertyId}/>
                </Gallery.AddModal>

                <Gallery.DeleteModal>
                    <DeleteSelectedItemsModal deleteMethod={deleteEvent}/>
                </Gallery.DeleteModal>
                
                <Gallery.Header title="Tapahtumat">
                    <div className="flex gap-4 items-center">
                        <div className="xs:hidden lg:block">
                            <SearchBar/>
                        </div>

                        <VisibilityProvider>
                            <VisibilityProvider.Trigger>
                                <i className="fa fa-search text-xl xs:block lg:hidden text-black cursor-pointer"/>
                            </VisibilityProvider.Trigger>

                            <VisibilityProvider.Target>
                                <SearchForEventsModal/>
                            </VisibilityProvider.Target>
                        </VisibilityProvider>
                        
                        <Gallery.DeleteModalTrigger>
                            <DeleteButton/>
                        </Gallery.DeleteModalTrigger>

                        <Gallery.AddModalTrigger>
                            <AddButton/>
                        </Gallery.AddModalTrigger>
                    </div> 
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