'use client';

import GalleryBase from '@/components/new/Gallery/GalleryBase/GalleryBase';
import AddModal from './components/AddModal/AddModal';
import EditModal from './components/EditModal/EditModal';
import Card from '../GalleryBase/Components/Body/Components/Card/Card';
import EventsMenu from './components/OverlayMenu/EventsMenu';
import ItemDeleteModal from '../Modals/ItemDeleteModal';
import DeleteModal from '../Modals/DeleteModal';
import { ModalProps } from 'kotilogi-app/components/Modals/Modal';

function ItemComponent(props: {
    item: any
}){
    return <Card 
        item={props.item}
        OverlayMenu={EventsMenu}
        DeleteModal={(hocprops: ModalProps) => {
            const deleteHandler = async () => {
                console.log('Deleting item...');
            }

            return (
                <ItemDeleteModal
                    {...hocprops}
                    deleteHandler={deleteHandler}
                />
            )
        }}
        titleContent={
        <>
            <span>{props.item.time !== null ? new Date(props.item.time).toLocaleDateString('fi-FI') : 'Ei Päivämäärää'}</span> 
            <br/>
        </>
        }
    />
}

type EventsGalleryProps = {
    propertyId: string
    propertyAddress: string,
}

export default function EventsGallery(props: EventsGalleryProps){
    return (
       <GalleryBase
            title="Tapahtumat"
            tableName="propertyEvents"
            contentType="object"
            query={{
                refId: props.propertyId
            }}
            AddModal={AddModal}
            DeleteModal={DeleteModal}
            EditModal={EditModal}
            key={'event-gallery'}
            ItemComponent={ItemComponent}
       />
    )
}