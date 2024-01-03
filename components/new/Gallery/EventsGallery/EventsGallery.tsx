'use client';

import {Gallery} from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import AddModal from './components/AddModal/AddModal';
import Card from '../GalleryBase/Components/Body/Components/Card/Card';
import EventsMenu from './components/OverlayMenu/EventsMenu';
import ItemDeleteModal from '../Modals/ItemDeleteModal';
import GlobalDeleteModal from '../Modals/GlobalDeleteModal/GlobalDeleteModal';
import Error from '../GalleryBase/Components/Error/Error';
import style from './style.module.scss';
import { SearchField } from '../GalleryBase/Components/SearchField/SearchField';

function ItemComponent(props: {
    item: any
}){
    const isConsolidated = parseInt(props.item.consolidationTime) > Date.now();

    return <Card 
        item={props.item}
        OverlayMenu={EventsMenu}
        DeleteModal={ItemDeleteModal}
        titleContent={
        <>
            <span className={style.date}>{props.item.time !== null ? new Date(props.item.time).toLocaleDateString('fi-FI') : 'Ei Päivämäärää'}</span> 
            <br/>
        </>
        }
        highlighted={isConsolidated}/>
}

type EventsGalleryProps = {
    propertyId: string
    propertyAddress: string,
}

export default function EventsGallery(props: EventsGalleryProps){
    return (
       <Gallery
            title="Tapahtumat"
            tableName="propertyEvents"
            query={{
                refId: props.propertyId
            }}
            key={'event-gallery'}>
            
            <Gallery.Header title="Tapahtumat" AddModal={AddModal} DeleteModal={GlobalDeleteModal}>
                <SearchField/>
            </Gallery.Header>
            <Gallery.Body itemComponent={ItemComponent} displayStyle='horizontal' errorComponent={<Error
                title="Ei Tapahtumia"
                message="Et ole vielä lisännyt tapahtumia. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."
                icon='/icons/history.png'/>}/>
       </Gallery>
    )
}