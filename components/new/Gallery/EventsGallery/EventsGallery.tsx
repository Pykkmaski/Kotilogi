'use client';

import GalleryBase from '@/components/new/Gallery/GalleryBase/GalleryBase';
import AddModal from './components/AddModal/AddModal';
import DeleteModal from './components/DeleteModal/DeleteModal';
import EditModal from './components/EditModal/EditModal';

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
       />
    )
}